import React from 'react'
import ReactDOM from 'react-dom'

import Colleges from '../colleges';

const Root = () => (
  <div>
    <Colleges />
  </div>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Root />,
    document.body.appendChild(document.createElement('div')),
  )
})
