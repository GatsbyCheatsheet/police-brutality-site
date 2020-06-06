import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import IncidentListing from "../components/incident-listing"

const StateTemplate = ({ data: { state, allPbIncident } }) => {
  const title = `Incidents in ${state.name}`

  return (
    <Layout>
      <SEO title={title} />
      <h2>{title}</h2>
      {allPbIncident.edges.map(({ node }) => (
        <IncidentListing incident={node} key={node.id} />
      ))}
    </Layout>
  )
}

export default StateTemplate

export const query = graphql`
  query($stateId: String!) {
    state(id: { eq: $stateId }) {
      name
    }
    allPbIncident(
      filter: { state: { id: { eq: $stateId } } }
      sort: { fields: date, order: DESC }
    ) {
      edges {
        node {
          id
          name
          slug
          links
          date
          edit_at
          state {
            id
            name
            slug
          }
          city {
            id
            name
            slug
          }
        }
      }
    }
  }
`
