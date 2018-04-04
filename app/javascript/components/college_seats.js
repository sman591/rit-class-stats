import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'

import { update as updateCourses } from 'modules/courses'
import CourseSeats from 'components/course_seats'

const sortCourses = (a, b) => {
  const keyA = a.public_id
  const keyB = b.public_id
  return keyA.localeCompare(keyB)
}

class CollegeSeats extends React.Component {
  state = {
    didLoad: false
  }

  componentDidMount() {
    this.props.updateCourses(this.props.college)
    this.timeout = setTimeout(() => this.setState({ didLoad: true }), 10000)
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  render() {
    const courses = Object.values(this.props.courses)

    const coursesByDepartment = courses.reduce((acc, course) => {
      acc[course.department] = acc[course.department] || []
      acc[course.department].push(course)
      return acc
    }, {})
    Object.values(coursesByDepartment).forEach(value => value.sort(sortCourses))

    let className = ''
    if (!this.state.didLoad) {
      className += 'CollegeSeats--before-first-load'
    }

    let lastUpdated = 'N/A'
    if (courses.length > 0) {
      lastUpdated = moment(courses[0].snapshot_at).format('dddd, MMMM Do YYYY, h:mm:ss a')
    }

    return (
      <div className={className}>
        <div><strong>Last Updated:</strong> {lastUpdated}</div>
        {Object.entries(coursesByDepartment).map((entry) => {
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

const mapStateToProps = ({ courses }, { college }) => ({
  courses: courses[college].courses,
  coursesLoaded: courses[college].loadedAt !== null,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  updateCourses,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollegeSeats)
