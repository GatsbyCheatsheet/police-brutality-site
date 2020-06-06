import React from "react"
import { Link } from "gatsby"
import { formatDate, formatLocation } from "../utils"
import EmbedLinks from "./embed-links"

const IncidentListing = ({
  incident: { slug, name, date, links, city, state },
}) => (
  <div className="incident-listing">
    <div className="box">
      <h3 className="incident-listing-title">
        <Link to={`/incident/${slug}`} title={name}>
          {name}
        </Link>
      </h3>
      <p className="incident-listing-meta">
        {formatDate(date)} &middot; {formatLocation(city, state)}
      </p>
      <EmbedLinks links={links} />
    </div>
  </div>
)

export default IncidentListing
