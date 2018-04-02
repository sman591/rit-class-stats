import React from 'react'
import { Link } from 'react-router-dom'

import CollegeSeats from 'components/college_seats'

export default class College extends React.PureComponent {
  render() {
    const code = this.props.match.params.code.toUpperCase()
    return (
      <div>
        <h1>{code}</h1>
        <CollegeSeats key={code} college={code} />
      </div>
    )
  }
}
