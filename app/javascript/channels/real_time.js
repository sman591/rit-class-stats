App.real_time = App.cable.subscriptions.create('RealTimeChannel', {
  connected: function() {
    console.log('connected')
  },
  disconnected: function() {
    console.log('disconnected')
  },
  received: function(data) {
    console.log('received', data)
  }
})
