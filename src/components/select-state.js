import React from "react"
import { graphql, useStaticQuery, navigate } from "gatsby"

const SelectState = _props => {
  const result = useStaticQuery(
    graphql`
      query {
        allState {
          edges {
            node {
              id
              name
              slug
            }
          }
        }
      }
    `
  )

  const onSelect = event => navigate(`/${event.target.value}`)

  /* eslint-disable jsx-a11y/no-onchange */
  return (
    <select onChange={onSelect}>
      {result.allState.edges.map(({ node: { id, name, slug } }) => (
        <option value={slug} key={id}>
          {name}
        </option>
      ))}
    </select>
  )
  /* eslint-enable jsx-a11y/no-onchange */
}

export default SelectState
