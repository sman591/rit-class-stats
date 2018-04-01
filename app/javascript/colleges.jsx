import React from 'react'

import CollegeCard from 'college_card'

export default class Colleges extends React.PureComponent {
  state = {
    colleges: []
  }

  componentDidMount() {
    fetch('/api/real_time_all')
      .then((response) => response.json().then((json) => {
        this.setState({ colleges: json })
      }))
  }

  render() {
    return (
      <div>
        {this.state.colleges.map((college) =>
          <CollegeCard
            key={college.college}
            code={college.college}
          />
        )}
      </div>
    );
  }
}
