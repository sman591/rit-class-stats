import React from 'react'
import ReactDOM from 'react-dom'

import { Link } from 'react-router-dom'

import CollegeSeats from 'college_seats'

export default class College extends React.PureComponent {
  state = {
    loaded: false,
    college: {}
  }

  componentDidMount() {
    const code = this.props.match.params.code.toUpperCase();
    fetch('/api/real_time_all')
      .then((response) => response.json().then((json) => {
        const college = json.find((college) => college.college === code);
        this.setState({
          college,
          loaded: true
        })
      }))
  }

  render() {
    const code = this.props.match.params.code.toUpperCase();
    return (
      <div>
        <Link to="/"><button>&laquo; Back</button></Link>
        <h1>{code}</h1>
        {!this.state.loaded && 'Loading...'}
        {this.state.loaded && <CollegeSeats {...this.state.college} /> }
      </div>
    );
  }
}
