import React from 'react'
import { Link } from 'react-router-dom'

import CollegeSeats from 'components/college_seats'

export default class College extends React.PureComponent {
  render() {
    const code = this.props.match.params.code.toUpperCase()
    return (
      <div>
        <Link to="/"><button>&laquo; Back</button></Link>
        <h1>{code}</h1>
        <CollegeSeats college={code} />
      </div>
    )
  }
}
