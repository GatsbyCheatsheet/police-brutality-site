import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import SelectCity from "../components/select-city"
import SelectState from "../components/select-state"
import IncidentListing from "../components/incident-listing"

const IndexPage = ({ data: { allPbIncident } }) => (
  <Layout>
    <SEO title="Home" />
    <h2>Latest Incidents</h2>
    <div className="level">
      <div className="level-left">
        <div className="level-item">
          By city:&nbsp;
          <SelectCity />
        </div>
        <div className="level-item">
          By state:&nbsp;
          <SelectState />
        </div>
      </div>
    </div>
    <br />
    {allPbIncident.edges.map(({ node }) => (
      <IncidentListing incident={node} key={node.id} />
    ))}
  </Layout>
)

export default IndexPage

// TODO pagination

// NOTE doesn't include null-date incidents
export const query = graphql`
  query {
    allPbIncident(
      limit: 20
      filter: { date: { ne: null } }
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
