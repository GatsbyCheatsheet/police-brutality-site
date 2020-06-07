import React, { useState, useEffect } from "react"
import { Tweet } from "react-twitter-widgets"
import InstagramEmbed from "react-instagram-embed"
import ExternalLinkButton from "./external-link-button"

// TODO renderers:
// - Youtube
// - Streamable
// - Gfycat
// - Imgur (+ gallery)

const linkName = link => {
  const url = new URL(link)
  return url.hostname.replace(/^www\./i, "")
}

const twitterTweetUrlRegex = /\/\/(www\.)?twitter\.com\/([A-Za-z0-9_]+)\/status\/(\d+)/

const instagramUrlRegex = /(\/\/(?:www\.)?(instagram\.com|instagr.am)\/p\/([^/?#&]+)).*/

// Currently, embed works with both old and new reddit links
const redditPostUrlRegex = /\/\/((www\.)|(old\.))?reddit\.com\/r\/(\w+)\/comments\/([a-z0-9]{2,10})/

const RedditPost = ({ link }) => {
  // Ensure component returns null when link changes,
  // allowing reddit js to catch up
  const [resetting, setResetting] = useState(true)
  useEffect(() => {
    setResetting(true)
    const timer = setTimeout(() => {
      setResetting(false)
    }, 100)
    return () => {
      clearTimeout(timer)
    }
  }, [link])

  return resetting ? null : (
    <div>
      <ExternalLinkButton href={link}>Reddit Permalink</ExternalLinkButton>
      <div>
        <blockquote
          className="reddit-card"
          data-card-created={Math.floor(Date.now() / 1000)}
        >
          <a href={link}>Loading Reddit Post...</a>
        </blockquote>
      </div>
    </div>
  )
}

const EmbedLink = ({ link }) => {
  // const ln = linkName(link)

  if (twitterTweetUrlRegex.test(link)) {
    const tweetId = link.match(twitterTweetUrlRegex)[2]
    if (tweetId) {
      return (
        <Tweet
          tweetId={tweetId}
          renderError={_err => (
            <>
              <p>Could not embed Tweet.</p>
              <p>
                <ExternalLinkButton href={link}>
                  View on Twitter
                </ExternalLinkButton>
              </p>
            </>
          )}
        />
      )
    }
  } else if (redditPostUrlRegex.test(link)) {
    return <RedditPost link={link} />
  } else if (instagramUrlRegex.test(link)) {
    return <InstagramEmbed url={link} injectScript={false} />
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
