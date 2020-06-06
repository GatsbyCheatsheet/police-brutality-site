import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import IncidentListing from "../components/incident-listing"
import { formatLocation } from "../utils"

const CityTemplate = ({ data: { city, allPbIncident } }) => {
  const title = `Incidents in ${formatLocation(city, city.state)}`

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
