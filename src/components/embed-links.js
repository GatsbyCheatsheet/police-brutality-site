import React, { useState } from "react"
import { Tweet } from "react-twitter-widgets"
import ExternalLinkButton from "./external-link-button"

// TODO renderers:
// - Youtube
// - Reddit
// - Streamable
// - Gfycat
// - Imgur (+ gallery)

const linkName = link => {
  const url = new URL(link)
  return url.hostname.replace(/^www\./i, "")
}

const twitterTweetUrlRegex = /twitter\.com\/([A-Za-z0-9_]+)\/status\/(\d+)/

const EmbedLink = ({ link }) => {
  // const ln = linkName(link)

  if (twitterTweetUrlRegex.test(link)) {
    const tweetId = link.match(twitterTweetUrlRegex)[2]
    if (tweetId) {
      return <Tweet tweetId={tweetId} />
    }
  }

  return <ExternalLinkButton href={link} />
}

const EmbedLinks = ({ links }) => {
  const [currentLink, setCurrentLink] = useState(links[0])

  return (
    <div className="embed-links">
      <div className="embed-links-tabs">
        {links.length === 0 ? (
          "No links available"
        ) : links.length === 1 ? null : (
          <div className="tabs">
            <ul>
              {links.map(link => {
                const handler = () => setCurrentLink(link)
                /* eslint-disable jsx-a11y/anchor-is-valid */
                return (
                  <li
                    key={link}
                    className={currentLink === link ? "is-active" : null}
                  >
                    <a
                      onClick={handler}
                      onKeyPress={handler}
                      role="button"
                      tabIndex="0"
                    >
                      {linkName(link)}
                    </a>
                  </li>
                )
                /* eslint-enable jsx-a11y/anchor-is-valid */
              })}
            </ul>
          </div>
        )}
      </div>
      <div className="embed-links-current">
        <EmbedLink link={currentLink} />
      </div>
    </div>
  )
}

export default EmbedLinks
