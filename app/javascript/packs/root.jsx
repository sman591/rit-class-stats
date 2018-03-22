import React from 'react'
import ReactDOM from 'react-dom'

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Colleges from '../colleges'
import College from '../college'

class Root extends React.Component {
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
      <Router>
        <Switch>
          <Route exact path="/" component={Colleges} />
          <Route path="/college/:code" component={College} />
        </Switch>
      </Router>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Root />,
    document.body.appendChild(document.createElement('div')),
  )
})
