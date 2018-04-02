import React from 'react'

const EMPTY = 'e'
const FILLED = 'f'
// const WAITLISTED = 'w'

export default class CourseSeats extends React.PureComponent {
  render() {
    const seats = new Array(Math.min(this.props.capacity_data.enrollment_cap, 100)).fill(EMPTY)
    const filledSeats = Math.min(this.props.capacity_data.enrollment_total, 100)
    for (let i = 0; i < filledSeats; i++) {
      seats[i] = FILLED
    }
    const id = this.props.public_id
    const code = id.substring(5, 8)
    const section = id.substring(9)
    return (
      <div className="CourseSeats">
        <div className="CourseSeats--name">
          <div className="CourseSeats--code">{code}</div>
          <div className="CourseSeats--section">{section}</div>
        </div>
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
