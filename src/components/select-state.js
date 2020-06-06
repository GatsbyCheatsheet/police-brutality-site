import React from "react"
import { graphql, useStaticQuery, navigate } from "gatsby"

const SelectState = _props => {
  const result = useStaticQuery(
    graphql`
      query {
        allState(sort: { fields: name, order: ASC }) {
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

  const onSelect = ({ target: { value } }) => value && navigate(`/${value}`)

  /* eslint-disable jsx-a11y/no-onchange */
  return (
    <div className="select is-small">
      <select onChange={onSelect}>
        <option>&mdash;</option>
        {result.allState.edges.map(({ node: { id, name, slug } }) => (
          <option value={slug} key={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  )
  /* eslint-enable jsx-a11y/no-onchange */
}

export default SelectState
