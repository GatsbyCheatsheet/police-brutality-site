import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const CityTemplate = ({ data: { city, allPbIncident } }) => {
  const title = `Incidents in ${city.name}, ${city.state.name}`

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
  query($cityId: String!) {
    city(id: { eq: $cityId }) {
      name
      state {
        name
      }
    }
    allPbIncident(
      filter: { city: { id: { eq: $cityId } } }
      sort: { fields: date, order: DESC }
    ) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`
