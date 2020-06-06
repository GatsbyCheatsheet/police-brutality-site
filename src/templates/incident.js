import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

// TODO

const IncidentTemplate = ({ data: { pbIncident } }) => {
  const { name } = pbIncident
  const title = `Incident: ${name}`

  return (
    <Layout>
      <SEO title={title} />
      <h2>{title}</h2>
      <p>TODO</p>
    </Layout>
  )
}

export default IncidentTemplate

export const query = graphql`
  query($id: String!) {
    pbIncident(id: { eq: $id }) {
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
`
