import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import IncidentListing from "../components/incident-listing"
import { formatLocation } from "../utils"

const CityTemplate = ({ data: { city, allPbIncident } }) => {
  const { state } = city
  const title = `Incidents in ${formatLocation(city, state)}`

  return (
    <Layout>
      <SEO title={title} />
      <h2>{title}</h2>
      <p>
        <Link
          to={`/${state.slug}`}
          title={`All incidents in ${state.name}`}
          className="button is-small is-light"
        >
          &#129121; See all incidents in {state.name}
        </Link>
      </p>
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
        slug
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
