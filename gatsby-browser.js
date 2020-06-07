/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

const loadjs = require(`loadjs`)

loadjs(`https://embed.redditmedia.com/widgets/platform.js`, `reddit-widgets`)
loadjs(`https://platform.instagram.com/en_US/embeds.js`, `instagram-embeds`)
