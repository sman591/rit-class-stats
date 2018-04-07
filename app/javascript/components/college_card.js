import React from 'react'
import { Link } from 'react-router-dom'

export default class CollegeCard extends React.PureComponent {
  render() {
    return (
      <div className="CollegeCard">
        <h1 className="CollegeCard__title">{this.props.code}</h1>
        <p className="CollegeCard__text"><strong>129</strong> courses being tracked</p>
        <Link to={`/college/${this.props.code}`}>
          <button className="CollegeCard__button">View &raquo;</button>
        </Link>
      </div>
    )
  }
}
