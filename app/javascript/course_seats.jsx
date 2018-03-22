import React from 'react'
import ReactDOM from 'react-dom'

const EMPTY = 'e'
const FILLED = 'f'
const WAITLISTED = 'w'

export default class CourseSeats extends React.PureComponent {
  render() {
    const seats = new Array(Math.min(this.props.course.enrollment_cap, 100)).fill('e')
    const filled_seats = Math.min(this.props.course.enrollment_total, 100)
    for (let i = 0; i < filled_seats; i++) {
      seats[i] = 'f'
    }
    return (
      <div className="CourseSeats">
        <div className="CourseSeats--code">{this.props.code}</div>
        <div className="CourseSeats--seats">
          {seats.map((seat, index) =>
            <div
              className={`CourseSeats--seat CourseSeats--seat--${seat}`}
              key={index}
            />
          )}
        </div>
      </div>
    );
  }
}
