import React from 'react'
import ReactDOM from 'react-dom'

import CourseSeats from 'course_seats';

export default class CollegeSeats extends React.PureComponent {
  render() {
    const keys = Object.keys(this.props.capacity_data);
    return (
      <div>
        <h1>{this.props.college}</h1>
        <div className="CollegeSeats--courses">
          {keys.map((key) =>
            <CourseSeats
              key={key}
              code={key}
              course={this.props.capacity_data[key]}
            />
          )}
        </div>
      </div>
    );
  }
}
