import React from 'react'
import ReactDOM from 'react-dom'

import CollegeSeats from 'college_seats';

export default class Colleges extends React.PureComponent {
  state = {
    colleges: [],
  };

  componentDidMount() {
    fetch('/api/real_time_all')
      .then((response) => response.json().then((json) => {
        this.setState({ colleges: json });
      }))
  }

  render() {
    return (
      <div>
        {this.state.colleges.map((college) => <CollegeSeats {...college} key={college.college} />)}
      </div>
    );
  }
}
