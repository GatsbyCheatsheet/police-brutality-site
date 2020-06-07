import React from "react"
import classNames from "classnames"

export default function ExternalLinkButton({
  isButton = true,
  className,
  children = "External Link",
  ...restProps
}) {
  return (
    <a
      className={classNames(className, { "button is-text": isButton })}
      target="_blank"
      rel="noopener noreferrer"
      {...restProps}
    >
      {children}&nbsp;&#x1F855;
    </a>
  )
}
