import React from "react"
import { graphql, useStaticQuery, navigate } from "gatsby"

const SelectCity = _props => {
  const result = useStaticQuery(
    graphql`
      query {
        allCity {
          edges {
            node {
              id
              name
              slug
              parent {
                ... on State {
                  slug
                }
              }
            }
          }
        }
      }
    `
  )

  const onSelect = event => navigate(event.target.value)

  /* eslint-disable jsx-a11y/no-onchange */
  return (
    <select onChange={onSelect}>
      {result.allCity.edges.map(({ node: { id, name, slug, parent } }) => (
        <option value={`/${parent.slug}/${slug}`} key={id}>
          {name}
        </option>
      ))}
    </select>
  )
  /* eslint-enable jsx-a11y/no-onchange */
}

export default SelectCity
