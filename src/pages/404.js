import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link } from "gatsby"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404 Page Not found" />
    <h2>404 Page Not Found</h2>
    <p>
      Go{" "}
      <Link to="/" title="Home">
        home
      </Link>
      ?
    </p>
  </Layout>
)

export default NotFoundPage
