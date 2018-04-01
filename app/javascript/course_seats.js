import React from 'react'

const EMPTY = 'e'
const FILLED = 'f'
// const WAITLISTED = 'w'

export default class CourseSeats extends React.PureComponent {
  render() {
    const seats = new Array(Math.min(this.props.course.capacity_data.enrollment_cap, 100)).fill(EMPTY)
    const filledSeats = Math.min(this.props.course.capacity_data.enrollment_total, 100)
    for (let i = 0; i < filledSeats; i++) {
      seats[i] = FILLED
    }
    const courseName = (this.props.course && this.props.course.public_id) || this.props.code
    return (
      <div className="CourseSeats">
        <div className="CourseSeats--code">{courseName}</div>
        <div className="CourseSeats--seats">
          {seats.map((seat, index) =>
            <div
              className={`CourseSeats--seat CourseSeats--seat--${seat}`}
              key={index}
            />
          )}
        </div>
      </div>
    )
  }
}
