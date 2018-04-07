import React from 'react'

import CourseSeats from 'components/course_seats'

export default class CollegeSeats extends React.Component {
  state = {
    didLoad: false
  }

  componentDidMount() {
    this.timeout = setTimeout(() => this.setState({ didLoad: true }), 10000)
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  render() {
    let className = ''
    if (!this.state.didLoad) {
      className += 'CollegeSeats--before-first-load'
    }

    return (
      <div className={className}>
        {Object.entries(this.props.coursesByDepartment).map((entry) => {
          const dept = entry[0]
          const deptCourses = entry[1]
          return (
            <div className="CollegeSeats__department" key={dept}>
              <div className="CollegeSeats__department-name">{dept}</div>
              <div className="CollegeSeats--courses">
                {deptCourses.map((course) =>
                  <CourseSeats
                    key={course.public_id}
                    code={course.public_id}
                    {...course}
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}
