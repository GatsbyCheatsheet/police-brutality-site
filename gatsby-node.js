/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const _ = require(`lodash`)
const path = require(`path`)
const slugify = require(`@sindresorhus/slugify`)

const pbTypeName = `PbIncident`

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
      data.forEach((obj, i) => {
        // TODO use incoming incident id
        const id = obj.id
          ? String(obj.id)
          : createNodeId(`${node.id} [${i}] >>> JSON`)

        const jsonNode = {
          ...obj,
          id,
          children: [],
          parent: node.id,
          internal: {
            contentDigest: createContentDigest(obj),
            type: pbTypeName,
          },
        }
        createNode(jsonNode)
        createParentChildLink({ parent: node, child: jsonNode })
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

  const incidentResults = await graphql(`
    {
      allPbIncident {
        edges {
          node {
            id
            name
            links
            date
            date_text
            city
            state
            edit_at
          }
        }
      }
    }
  `)

  // Handle errors
  if (incidentResults.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Create individual incident pages
  incidentResults.data.allPbIncident.edges.forEach(({ node }) => {
    createPage({
      path: `/incident/${node.id}`,
      component: incidentTemplate,
      context: {
        id: node.id, // use node id for now
      },
    })
  })

  // Group cities by state
  // NOTE should always account for multiple cities with same name (e.g. Kansas City)
  const cityStates = incidentResults.data.allPbIncident.edges.reduce(
    (acc, { node: { state, city } }) => {
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
    },
    {}
  )

  Object.entries(cityStates).forEach(([state, cities]) => {
    const stateSlug = slugify(state)
    const statePath = `/${stateSlug}`

    // Create state page
    createPage({
      path: statePath,
      component: stateTemplate,
      context: {
        state,
        cities: [...cities], // set => array
      },
    })

    // Create city pages
    cities.forEach(city => {
      createPage({
        path: `${statePath}/${slugify(city)}`,
        component: cityTemplate,
        context: {
          state: state,
          city: city,
        },
      })
    })
  })
}
