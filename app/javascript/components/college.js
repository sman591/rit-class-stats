import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'

import { COLLEGE_NAMES } from '../constants'
import { update as updateCourses } from 'modules/courses'
import CollegeSeats from 'components/college_seats'

const sortCourses = (a, b) => {
  const keyA = a.public_id
  const keyB = b.public_id
  return keyA.localeCompare(keyB)
}

class College extends React.PureComponent {
  componentDidMount() {
    this.props.updateCourses(this.props.match.params.code.toUpperCase())
  }

  render() {
    const code = this.props.match.params.code.toUpperCase()
    const courses = Object.values(this.props.courses)

    const coursesByDepartment = courses.reduce((acc, course) => {
      acc[course.department] = acc[course.department] || []
      acc[course.department].push(course)
      return acc
    }, {})
    Object.values(coursesByDepartment).forEach(value => value.sort(sortCourses))

    let lastUpdated = 'N/A'
    if (courses.length > 0) {
      lastUpdated = moment(courses[0].snapshot_at).format('dddd, MMMM Do YYYY, h:mm:ss a')
    }

    return (
      <div className="College">
        <div className="College__details">
          <h1 className="College__title">{code}<small className="College__subtitle">{COLLEGE_NAMES[code]}</small></h1>
          <p className="College__updated-at"><strong>Last Updated:</strong> {lastUpdated}</p>
        </div>
        <CollegeSeats
          key={code}
          college={code}
          courses={courses}
          coursesByDepartment={coursesByDepartment}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ courses }, { match }) => {
  const college = match.params.code.toUpperCase()
  return {
    courses: courses[college].courses,
    coursesLoaded: courses[college].loadedAt !== null,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  updateCourses,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(College)
