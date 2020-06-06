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
      <section className="section">
        <Header siteTitle={data.site.siteMetadata.title} />
      </section>
      <section className="section" style={{ flex: 1 }}>
        <div className="content">
          <div className="container">
            <main className="main">{children}</main>
          </div>
        </div>
      </section>
      <section className="section">
        <footer className="footer">
          <div className="container">
            <div className="has-text-centered">
              © {new Date().getFullYear()} &middot;{" "}
              <a
                href={data.site.siteMetadata.sourceUrl}
                title="Source code on GitHub"
              >
                Source
              </a>
            </div>
          </div>
        </footer>
      </section>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
