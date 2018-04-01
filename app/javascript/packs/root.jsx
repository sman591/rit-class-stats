import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import {
  Route,
  Switch
} from 'react-router-dom'


import Colleges from '../colleges'
import College from '../college'
import store, { history } from '../store';

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
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact path="/" component={Colleges} />
            <Route path="/college/:code" component={College} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Root />,
    document.body.appendChild(document.createElement('div')),
  )
})
