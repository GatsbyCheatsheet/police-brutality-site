import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const StateTemplate = ({ data: { state, allPbIncident } }) => {
  const title = `Incidents in ${state.name}`

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

// TODO use ($stateId: String!) in allPbIncident
export const query = graphql`
  query($stateId: String!) {
    state(id: { eq: $stateId }) {
      name
    }
    allPbIncident(sort: { fields: date, order: DESC }) {
      edges {
        node {
          id
          name
          slug
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
