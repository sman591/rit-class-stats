import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { update as updateCourses } from 'modules/courses';

import CourseSeats from 'course_seats'

class CollegeSeats extends React.PureComponent {
  state = {
    didLoad: false
  }

  componentDidMount() {
    this.props.coursesLoaded || this.fetchCourses()
    this.timeout = setTimeout(() => this.setState({ didLoad: true }), 5000)
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  async fetchCourses() {
    const response = await fetch('/api/courses')
    const json = await response.json()
    const code = this.props.college;
    const courseData = json.filter((course) => course.college === code)
    const courses = courseData.reduce((acc, course) => {
      acc[course.course_id] = course
      return acc
    }, {})
    this.props.updateCourses(courses)
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

const mapStateToProps = ({ courses }) => ({
  courses: courses.courses,
  coursesLoaded: courses.loadedAt !== null,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  updateCourses,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollegeSeats)
