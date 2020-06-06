import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "../styles/layout.scss"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          sourceUrl
        }
      }
    }
  `)

  return (
    <div className="site">
      <Header siteTitle={data.site.siteMetadata.title} />
      <div className="content">
        <div className="wrapper">
          <main className="main">{children}</main>
        </div>
      </div>
      <footer className="footer">
        <div className="wrapper">
          © {new Date().getFullYear()} &middot;{" "}
          <a
            href={data.site.siteMetadata.sourceUrl}
            title="Source code on GitHub"
          >
            Source
          </a>
        </div>
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
