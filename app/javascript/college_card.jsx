import React from 'react'

import { Link } from 'react-router-dom'

export default class CollegeCard extends React.PureComponent {
  render() {
    return (
      <div className="CollegeCard">
        <h1>{this.props.code}</h1>
        <Link to={`/college/${this.props.code}`}><button>Open &raquo;</button></Link>
      </div>
    );
  }
}
