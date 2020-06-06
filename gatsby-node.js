/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const _ = require(`lodash`)

const pbTypeName = "PbIncident"

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
