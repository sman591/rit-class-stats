import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { update as updateCourses } from 'modules/courses'
import CourseSeats from 'course_seats'

class CollegeSeats extends React.PureComponent {
  state = {
    didLoad: false
  }

  componentDidMount() {
    this.props.updateCourses(this.props.college)
    this.timeout = setTimeout(() => this.setState({ didLoad: true }), 5000)
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  render() {
    const keys = Object.keys(this.props.courses)
    let className = 'CollegeSeats--courses'
    if (this.state.didLoad) {
      className += ' CollegeSeats--after-first-load'
    }
    return (
      <div className={className}>
        {keys.map((key) =>
          <CourseSeats
            key={key}
            code={key}
            course={this.props.courses[key]}
          />
        )}
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
