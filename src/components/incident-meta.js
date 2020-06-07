import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { formatDate, formatLocation } from "../utils"

function LocationLinkCity({ city, state }) {
  const linkBase = `/${state.slug}`
  const locationString = formatLocation(city, state)

  return (
    <Link
      to={city ? `${linkBase}/${city.slug}` : linkBase}
      title={`See all incidents in ${locationString}`}
    >
      {locationString}
    </Link>
  )
}
LocationLinkCity.propTypes = {
  state: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  city: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
}

function IncidentMeta({ incident: { date, city, state } }) {
  return (
    <p className="incident-meta">
      {formatDate(date)} &middot; <LocationLinkCity city={city} state={state} />
    </p>
  )
}

export default IncidentMeta
