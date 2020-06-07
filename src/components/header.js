import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const NavbarItemLink = props => (
  <Link className="navbar-item" activeClassName="is-active" {...props} />
)

const Header = ({ siteTitle }) => (
  <header className="site-header">
    <nav className="navbar is-dark">
      <div className="container">
        <div className="navbar-brand">
          <h1 className="site-title">
            <Link to="/" title="Home" className="navbar-item">
              {siteTitle}
            </Link>
          </h1>
          <span className="navbar-burger burger" data-target="navbarMenu">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </div>
        <div className="navbar-menu">
          <div className="navbar-end">
            <NavbarItemLink to="/">Home</NavbarItemLink>
            <NavbarItemLink to="/about">About</NavbarItemLink>
          </div>
        </div>
      </div>
    </nav>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
