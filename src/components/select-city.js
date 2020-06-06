import React from "react"
import { graphql, useStaticQuery, navigate } from "gatsby"

const SelectCity = _props => {
  const result = useStaticQuery(
    graphql`
      query {
        allState(sort: { fields: name, order: ASC }) {
          edges {
            node {
              id
              slug
              name
              childrenCity {
                id
                slug
                name
              }
            }
          }
        }
      }
    `
  )

  const onSelect = ({ target: { value } }) => value && navigate(value)

  /* eslint-disable jsx-a11y/no-onchange */
  return (
    <div className="select is-small">
      <select onChange={onSelect}>
        <option>&mdash;</option>
        {result.allState.edges.map(({ node: state }) => (
          <optgroup label={state.name} key={state.id}>
            {state.childrenCity.length > 0 ? (
              state.childrenCity.map(city => (
                <option value={`/${state.slug}/${city.slug}`} key={city.id}>
                  {city.name}
                </option>
              ))
            ) : (
              // Handle Unknown Location (no cities)
              <option value={`/${state.slug}`}>{state.name}</option>
            )}
          </optgroup>
        ))}
      </select>
    </div>
  )
  /* eslint-enable jsx-a11y/no-onchange */
}

export default SelectCity
