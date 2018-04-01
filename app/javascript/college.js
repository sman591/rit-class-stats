import React from 'react'

import { Link } from 'react-router-dom'

import CollegeSeats from 'college_seats'

export default class College extends React.PureComponent {
  state = {
    loaded: false,
    courses: {},
    real_time_data: {},
  }

  componentDidMount() {
    this.fetchRealtimeData()
  }

  async fetchRealtimeData() {
    const response = await fetch('/api/real_time_all')
    const json = await response.json()
    const code = this.props.match.params.code.toUpperCase()
    const real_time_data = json.find((college) => college.college === code)
    this.setState({
      real_time_data,
      loaded: true
    })
  }

  render() {
    const code = this.props.match.params.code.toUpperCase()
    return (
      <div>
        <Link to="/"><button>&laquo; Back</button></Link>
        <h1>{code}</h1>
        {!this.state.loaded && 'Loading...'}
        {this.state.loaded && <CollegeSeats {...this.state.real_time_data} /> }
      </div>
    )
  }
}
