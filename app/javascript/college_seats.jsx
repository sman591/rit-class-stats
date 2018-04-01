import React from 'react'
import ReactDOM from 'react-dom'

import CourseSeats from 'course_seats'

export default class CollegeSeats extends React.PureComponent {
  state = {
    didLoad: false
  }

  componentDidMount() {
    this.timeout = setTimeout(() => this.setState({ didLoad: true }), 5000)
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  render() {
    const keys = Object.keys(this.props.capacity_data)
    let className = 'CollegeSeats--courses';
    if (this.state.didLoad) {
      className += ' CollegeSeats--after-first-load';
    }
    return (
      <div className={className}>
        {keys.map((key) =>
          <CourseSeats
            key={key}
            code={key}
            capacity_data={this.props.capacity_data[key]}
            course={this.props.courses[key]}
          />
        )}
      </div>
    );
  }
}
