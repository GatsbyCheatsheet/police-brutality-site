import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

// TODO

const StateTemplate = ({ pageContext, data: { allPbIncident } }) => {
  const {
    state,
    // TODO cities
  } = pageContext

  const title = `Incidents in ${state}`

  return (
    <Layout>
      <SEO title={title} />
      <h2>{title}</h2>
      {allPbIncident.edges.map(({ node }) => (
        <li key={node.id}>{node.name}</li>
      ))}
    </Layout>
  )
}

export default StateTemplate

export const query = graphql`
  query($state: String!) {
    allPbIncident(filter: { state: { eq: $state } }) {
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
