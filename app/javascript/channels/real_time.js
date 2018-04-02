import store from 'store'

import { patchRealTime } from 'modules/courses'

const realTime = () => {
  App.real_time = App.cable.subscriptions.create('RealTimeChannel', {
    connected: function() {
      console.log('connected')
    },
    disconnected: function() {
      console.log('disconnected')
    },
    received: function(data) {
      console.log('received', data)
      store.dispatch(patchRealTime('GCCIS', data.course_real_time))
    }
  })
}

export default realTime
