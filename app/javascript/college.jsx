import React from 'react'
import ReactDOM from 'react-dom'

import { Link } from 'react-router-dom'

import CollegeSeats from 'college_seats'

export default class College extends React.PureComponent {
  state = {
    loaded: false,
    courses: {},
    real_time_data: {},
  }

  componentDidMount() {
    const code = this.props.match.params.code.toUpperCase();
    fetch('/api/real_time_all')
      .then((response) => response.json().then((json) => {
        const real_time_data = json.find((college) => college.college === code);
        this.setState({
          real_time_data,
          loaded: true
        })
      }))
    fetch('/api/courses')
      .then((response) => response.json().then((json) => {
        const courseData = json.filter((course) => course.college === code)
        const courses = courseData.reduce((acc, course) => {
          acc[course.course_id] = course
          return acc
        }, {})
        this.setState({ courses })
      }))
  }

  render() {
    const code = this.props.match.params.code.toUpperCase();
    return (
      <div>
        <Link to="/"><button>&laquo; Back</button></Link>
        <h1>{code}</h1>
        {!this.state.loaded && 'Loading...'}
        {this.state.loaded && <CollegeSeats {...this.state.real_time_data} courses={this.state.courses} /> }
      </div>
    );
  }
}
