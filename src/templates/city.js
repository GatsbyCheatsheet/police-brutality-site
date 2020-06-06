import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const CityTemplate = ({ data: { city, allPbIncident } }) => {
  const title = `Incidents in ${city.name}, ${city.parent.name}`

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

// TODO use cityId in allPbIncident
export const query = graphql`
  query($cityId: String!) {
    city(id: { eq: $cityId }) {
      name
      parent {
        ... on State {
          name
        }
      }
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
