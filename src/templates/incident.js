import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import IncidentMeta from "../components/incident-meta"
import EmbedLinks from "../components/embed-links"

const IncidentTemplate = ({ data: { pbIncident } }) => {
  const { name, links } = pbIncident
  const title = `Incident: ${name}`

  return (
    <Layout>
      <SEO title={title} />
      <h2>{title}</h2>
      <IncidentMeta incident={pbIncident} />
      <EmbedLinks links={links} />
    </Layout>
  )
}

export default IncidentTemplate

export const query = graphql`
  query($incidentId: String!) {
    pbIncident(id: { eq: $incidentId }) {
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
`
