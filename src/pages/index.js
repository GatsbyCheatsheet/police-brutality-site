import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data: { allPbIncident } }) => (
  <Layout>
    <SEO title="Home" />
    <p>TODO</p>
    {allPbIncident.edges.map(({ node }) => (
      <li key={node.id}>
        <Link to={`/incident/${node.id}`} title={node.name}>
          {node.name}
        </Link>
      </li>
    ))}
  </Layout>
)

export default IndexPage

export const query = graphql`
  query {
    allPbIncident(limit: 2000, sort: { fields: date, order: DESC }) {
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
`
