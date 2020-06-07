import React, { useState, useEffect } from "react"
import { Tweet } from "react-twitter-widgets"
import InstagramEmbed from "react-instagram-embed"
import YouTube from "react-youtube"
import ExternalLinkButton from "./external-link-button"

const linkName = link => {
  const url = new URL(link)
  return url.hostname.replace(/^www\./i, "")
}

const twitterTweetUrlRegex = /\/\/(www\.)?twitter\.com\/([A-Za-z0-9_]+)\/status\/(\d+)/

const instagramUrlRegex = /(\/\/(?:www\.)?(instagram\.com|instagr.am)\/p\/([^/?#&]+)).*/

// Currently, embed works with both old and new reddit links
// Ensures it isn't a comment link (no code after title slug part)
const redditPostUrlRegex = /\/\/((www\.)|(old\.))?reddit\.com\/r\/(\w+)\/comments\/([a-z0-9]{2,10})(\/?$|\/\w+\/?$)/

const youtubeUrlRegex = /\/\/(www\.)?(youtube\.com\/watch\?.*v=|youtube\.com\/embed\/|youtu\.be\/)([A-Za-z0-9_-]{11})(.*)?/

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
      <div>
        <blockquote
          className="reddit-card"
          data-card-created={Math.floor(Date.now() / 1000)}
        >
          <a href={link}>Loading Reddit Post...</a>
        </blockquote>
      </div>
      <p>
        <ExternalLinkButton href={link}>Reddit Permalink</ExternalLinkButton>
      </p>
    </div>
  )
}

const EmbedLink = ({ link }) => {
  // const ln = linkName(link)

  if (twitterTweetUrlRegex.test(link)) {
    const tweetId = link.match(twitterTweetUrlRegex)[3]
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
  } else if (youtubeUrlRegex.test(link)) {
    const videoId = link.match(youtubeUrlRegex)[3]
    if (videoId) {
      console.log(videoId)
      return (
        <>
          <YouTube videoId={videoId} />
          <p>
            <ExternalLinkButton href={link}>View on YouTube</ExternalLinkButton>
          </p>
        </>
      )
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
        ) : (
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
