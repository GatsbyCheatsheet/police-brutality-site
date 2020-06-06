/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const _ = require(`lodash`)
const path = require(`path`)
const slugify = require(`@sindresorhus/slugify`)

// Source 2020PB json into PbIncident nodes
exports.onCreateNode = async function onCreateNode({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  createContentDigest,
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

    if (_.isArray(data) && data[0] && data[0].links) {
      data.forEach((incident, i) => {
        // TODO FUTURE use incoming incident id once available
        const id = incident.id
          ? String(incident.id)
          : createNodeId(`${node.id} [${i}] >>> JSON`)

        incident.slug = id

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
        createParentChildLink({ parent: node, child: incidentNode })
      })

      // TODO need to link City/State nodes to incident nodes

      const cityStates = data.reduce((acc, { state, city }) => {
        if (!state) {
          return acc
        }

        if (!acc[state]) {
          acc[state] = new Set()
        }

        if (city) {
          acc[state].add(city)
        }

        return acc
      }, {})

      Object.entries(cityStates).forEach(([state, cities]) => {
        if (state) {
          const stateSlug = slugify(state)
          const stateObj = {
            name: state,
            slug: stateSlug,
          }

          const stateNode = {
            ...stateObj,
            id: stateSlug,
            children: [],
            parent: null,
            internal: {
              contentDigest: createContentDigest(stateObj),
              type: `State`,
            },
          }
          createNode(stateNode)

          cities.forEach(city => {
            if (city) {
              const citySlug = slugify(city)
              const cityObj = {
                name: city,
                slug: citySlug,
              }
              const cityNodeId = `${citySlug}-${stateSlug}`
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
              createParentChildLink({ parent: stateNode, child: cityNode })
            }
          })
        }
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
            parent {
              ... on State {
                slug
              }
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
  results.data.allPbIncident.edges.forEach(({ node }) => {
    createPage({
      path: `/incident/${node.slug}`,
      component: incidentTemplate,
      context: {
        incidentId: node.id, // use node id for now
      },
    })
  })

  // Create state pages
  results.data.allState.edges.forEach(({ node }) => {
    createPage({
      path: `/${node.slug}`,
      component: stateTemplate,
      context: {
        stateId: node.id,
      },
    })
  })

  // Create city pages
  results.data.allCity.edges.forEach(({ node }) => {
    createPage({
      path: `/${node.parent.slug}/${node.slug}`,
      component: cityTemplate,
      context: {
        cityId: node.id,
      },
    })
  })
}
