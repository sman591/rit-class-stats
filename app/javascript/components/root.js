import React from 'react'
import { Switch, Route } from 'react-router-dom'

import realTime from 'channels/real_time'
import Nav from 'components/nav'
import Colleges from 'components/colleges'
import College from 'components/college'

export default class Root extends React.Component {
  componentDidMount() {
    realTime()
  }

  render() {
    return (
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Colleges} />
          <Route path="/college/:code" component={College} />
        </Switch>
      </div>
    )
  }
}
