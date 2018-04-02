class RealTimeChannel < ApplicationCable::Channel
  def subscribed
    stop_all_streams
    stream_from 'real_time:course_real_times'
  end

  def unsubscribed
    stop_all_streams
  end
end
