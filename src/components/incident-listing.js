import React from "react"
import { Link } from "gatsby"
import EmbedLinks from "./embed-links"
import IncidentMeta from "./incident-meta"

const IncidentListing = ({ incident }) => {
  const { slug, name, links } = incident

  return (
    <div className="incident-listing">
      <div className="box">
        <h3 className="incident-listing-title">
          <Link to={`/incident/${slug}`} title={name}>
            {name}
          </Link>
        </h3>
        <IncidentMeta incident={incident} />
        <EmbedLinks links={links} />
      </div>
    </div>
  )
}

export default IncidentListing
