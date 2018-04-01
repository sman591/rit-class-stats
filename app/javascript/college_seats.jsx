import React from 'react'
import ReactDOM from 'react-dom'

import CourseSeats from 'course_seats'

export default class CollegeSeats extends React.PureComponent {
  render() {
    const keys = Object.keys(this.props.capacity_data)
    return (
      <div className="CollegeSeats--courses">
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
