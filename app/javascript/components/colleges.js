import React from 'react'

import { COLLEGES } from '../constants'
import CollegeCard from 'components/college_card'

export default class Colleges extends React.PureComponent {
  render() {
    return (
      <div className="Colleges">
        {COLLEGES.map((code) =>
          <CollegeCard
            key={code}
            code={code}
          />
        )}
      </div>
    )
  }
}
