/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const _ = require(`lodash`)
const path = require(`path`)
const slugify = require(`@sindresorhus/slugify`)

const expectedIncomingIncidentFields = [
  "id",
  "name",
  "links",
  "date",
  "date_text", // removed
  "city",
  "state",
  "edit_at",
]

const unknownLocationStateName = "Unknown Location"

exports.createSchemaCustomization = function createSchemaCustomization({
  actions,
  schema,
}) {
  const { createTypes } = actions

  createTypes([
    schema.buildObjectType({
      name: "State",
      interfaces: ["Node"],
      fields: {
        name: "String!",
        slug: "String!",
        childrenCity: {
          type: "[City!]!",
          resolve: (source, _args, context, _info) => {
            return context.nodeModel
              .getAllNodes({ type: "City" })
              .filter(city => city.state_id === source.id)
          },
        },
      },
    }),
    `type City implements Node {
      name: String!
      slug: String!
      state_id: String!
      state: State! @link(by: "id", from: "state_id")
    }`,
    `type PbIncident implements Node {
      name: String!
      slug: String!
      links: [String!]!
      date: Date @dateformat(formatString: "YYYY-MM-DD")
      edit_at: String
      state_id: String!
      state: State! @link(by: "id", from: "state_id")
      city_id: String
      city: City @link(by: "id", from: "city_id")
    }`,
  ])
}

// Source 2020PB json into PbIncident nodes
exports.onCreateNode = async function onCreateNode({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  createContentDigest,
  reporter,
}) {
  const { createNode, createParentChildLink } = actions

  if (
    node.internal.mediaType === `application/json` &&
    node.sourceInstanceName === `2020pb`
  ) {
    // Parse JSON
    const content = await loadNodeContent(node)
    let parsedContent
    try {
      parsedContent = JSON.parse(content)
    } catch {
      const hint = node.absolutePath
        ? `file ${node.absolutePath}`
        : `in node ${node.id}`
      throw new Error(`Unable to parse JSON: ${hint}`)
    }

    const { data } = parsedContent

    if (_.isArray(data) && data[0] && _.isObject(data[0])) {
      // Create State and City nodes
      const cityStates = data.reduce(
        (acc, { state, city }) => {
          if (!state) {
            return acc
          }
          if (!acc[state]) {
            acc[state] = new Set()
          }
          if (city && city.length > 0) {
            acc[state].add(city)
          }
          return acc
        },
        {
          [unknownLocationStateName]: new Set(),
        }
      )
      const cityStateIds = {}
      Object.entries(cityStates).forEach(([state, cities]) => {
        if (state) {
          // Create State node
          const stateSlug = slugify(state)
          const stateId = stateSlug
          const stateObj = {
            name: state,
            slug: stateSlug,
          }
          const stateNode = {
            ...stateObj,
            id: stateId,
            children: [],
            parent: null,
            internal: {
              contentDigest: createContentDigest(stateObj),
              type: `State`,
            },
          }
          createNode(stateNode)

          // Create City nodes for this State
          // NOTE cities could be empty, e.g. for "Unknown Location" state
          const cityIds = {}
          cities.forEach(city => {
            const citySlug = slugify(city)
            const cityObj = {
              name: city,
              slug: citySlug,
              state_id: stateId,
            }
            const cityNodeId = `${citySlug}-${stateSlug}`
            cityIds[city] = cityNodeId

            const cityNode = {
              ...cityObj,
              id: cityNodeId,
              children: [],
              parent: stateNode.id,
              internal: {
                contentDigest: createContentDigest(cityObj),
                type: `City`,
              },
            }
            createNode(cityNode)
          })

          cityStateIds[state] = {
            stateId,
            cityIds,
          }
        }
      })

      // Create Incident nodes
      let warnedUnexpectedKeys = false
      data.forEach(incomingIncident => {
        // Check for unexpected (possibly new) incoming keys
        if (!warnedUnexpectedKeys) {
          const diff = _.difference(
            Object.keys(incomingIncident),
            expectedIncomingIncidentFields
          )
          if (diff.length > 0) {
            reporter.warn(
              `Incoming incident had unexpected keys: ${diff.join(", ")}`
            )
            warnedUnexpectedKeys = true
          }
        }

        const incident = _.pick(
          incomingIncident,
          _.without(expectedIncomingIncidentFields, "date_text")
        )
        incident.state = incident.state || unknownLocationStateName
        const csi = incident.state && cityStateIds[incident.state]
        incident.state_id = csi && csi.stateId
        incident.city_id = csi && csi.cityIds[incident.city]
        delete incident.state
        delete incident.city

        // Ensure has name
        if (typeof incident.name !== "string" || incident.name.length === 0) {
          reporter.warn("Incident missing string name; skipping")
          console.log(incomingIncident)
          return // continue
        }

        if (!incident.links) {
          incident.links = []
        }

        if (!incident.date) {
          incident.date = null
        }

        if (!incident.edit_at) {
          incident.edit_at = null
        }

        // Use incoming incident id if available
        const id =
          incident.id ||
          createNodeId(
            `${incident.name}${incident.date}${incident.city}${incident.state}`
          )

        incident.slug = id

        // Create Incident node
        const incidentNode = {
          ...incident,
          id,
          children: [],
          parent: node.id,
          internal: {
            contentDigest: createContentDigest(incident),
            type: `PbIncident`,
          },
        }
        createNode(incidentNode)
        // Link to parent File node
        createParentChildLink({ parent: node, child: incidentNode })
      })
    } else {
      throw new Error(`Bad 2020PB JSON`)
    }
  }
}

// Create pages
exports.createPages = async function createPages({ graphql, actions }) {
  const { createPage } = actions

  const incidentTemplate = path.resolve(`src/templates/incident.js`)
  const stateTemplate = path.resolve(`src/templates/state.js`)
  const cityTemplate = path.resolve(`src/templates/city.js`)

  const results = await graphql(`
    {
      allPbIncident {
        edges {
          node {
            id
            slug
          }
        }
      }
      allState {
        edges {
          node {
            id
            slug
          }
        }
      }
      allCity {
        edges {
          node {
            id
            slug
            state {
              slug
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (results.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Create individual incident pages
  results.data.allPbIncident.edges.forEach(({ node: { id, slug } }) => {
    createPage({
      path: `/incident/${slug}`,
      component: incidentTemplate,
      context: {
        incidentId: id,
      },
    })
  })

  // Create state pages
  results.data.allState.edges.forEach(({ node: { id, slug } }) => {
    createPage({
      path: `/${slug}`,
      component: stateTemplate,
      context: {
        stateId: id,
      },
    })
  })

  // Create city pages
  results.data.allCity.edges.forEach(({ node: { id, slug, state } }) => {
    createPage({
      path: `/${state.slug}/${slug}`,
      component: cityTemplate,
      context: {
        cityId: id,
      },
    })
  })
}
