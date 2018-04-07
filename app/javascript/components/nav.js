import React from 'react'
import { Link } from 'react-router-dom'

import { COLLEGES } from '../constants'

export default class Nav extends React.Component {
  render() {
    return (
      <nav className="Nav">
        {COLLEGES.map((code) => (
          <Link
            key={code}
            to={`/college/${code.toLowerCase()}`}
            className="Nav__link">
            {code}
          </Link>
        ))}
      </nav>
    )
  }
}
