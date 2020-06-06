import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

// TODO

const CityTemplate = ({ pageContext, data: { allPbIncident } }) => {
  const { state, city } = pageContext

  const title = `Incidents in ${city}, ${state}`

  return (
    <Layout>
      <SEO title={title} />
      <h2>{title}</h2>
      <ul>
        {allPbIncident.edges.map(({ node }) => (
          <li key={node.id}>{node.name}</li>
        ))}
      </ul>
    </Layout>
  )
}

export default CityTemplate

export const query = graphql`
  query($state: String!, $city: String!) {
    allPbIncident(filter: { state: { eq: $state }, city: { eq: $city } }) {
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
