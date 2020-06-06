import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { formatDate } from "../utils"

const IncidentTemplate = ({ data: { pbIncident } }) => {
  const { name, date, city, state } = pbIncident
  const title = `Incident: ${name}`

  return (
    <Layout>
      <SEO title={title} />
      <h2>{title}</h2>
      <p>Date: {formatDate(date)}</p>
      <p>
        Location: {city && city.name}, {state && state.name}
      </p>
    </Layout>
  )
}

export default IncidentTemplate

export const query = graphql`
  query($incidentId: String!) {
    pbIncident(id: { eq: $incidentId }) {
      id
      name
      links
      date
      city {
        name
      }
      state {
        name
      }
      edit_at
    }
  }
`
