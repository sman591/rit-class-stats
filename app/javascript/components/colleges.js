import React from 'react'

import { COLLEGES } from 'modules/courses'
import CollegeCard from 'components/college_card'

export default class Colleges extends React.PureComponent {
  render() {
    return (
      <div>
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
