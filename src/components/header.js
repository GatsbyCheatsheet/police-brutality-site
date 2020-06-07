import React, { useState } from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import classNames from "classnames"

const NavbarItemLink = props => (
  <Link className="navbar-item" activeClassName="is-active" {...props} />
)

const Header = ({ siteTitle }) => {
  const [navbarIsActive, setNavbarIsActive] = useState(false)

  const toggleNavbar = () => setNavbarIsActive(!navbarIsActive)

  /* eslint-disable jsx-a11y/anchor-is-valid */
  const burger = (
    <a
      role="button"
      aria-label="menu"
      aria-expanded={navbarIsActive}
      className={classNames("navbar-burger burger", {
        "is-active": navbarIsActive,
      })}
      onClick={toggleNavbar}
      onKeyPress={toggleNavbar}
      tabIndex="0"
    >
      <span></span>
      <span></span>
      <span></span>
    </a>
  )
  /* eslint-enable jsx-a11y/anchor-is-valid */

  return (
    <header className="site-header">
      <nav className="navbar is-dark">
        <div className="container">
          <div className="navbar-brand">
            <h1 className="site-title">
              <Link to="/" title="Home" className="navbar-item">
                {siteTitle}
              </Link>
            </h1>
            {burger}
          </div>
          <div
            className={classNames("navbar-menu", {
              "is-active": navbarIsActive,
            })}
          >
            <div className="navbar-end">
              <NavbarItemLink to="/">Home</NavbarItemLink>
              <NavbarItemLink to="/about">About</NavbarItemLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
