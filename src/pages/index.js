import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import SelectCity from "../components/select-city"
import SelectState from "../components/select-state"

const IndexPage = ({ data: { allPbIncident } }) => (
  <Layout>
    <SEO title="Home" />
    <p>
      By city: <SelectCity />
      &nbsp;&nbsp; By state: <SelectState />
    </p>
    {allPbIncident.edges.map(({ node: { id, slug, name } }) => (
      <li key={id}>
        <Link to={`/incident/${slug}`} title={name}>
          {name}
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
          slug
        }
      }
    }
  }
`
