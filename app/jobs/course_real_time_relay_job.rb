# frozen_string_literal: true

class CourseRealTimeRelayJob < ApplicationJob
  queue_as :default

  def perform(*args)
    course_real_time_id = args[0][:course_real_time_id]
    @course_real_time = CourseRealTime.find_by_id(course_real_time_id)
    return if @course_real_time.blank?

    newer_obj = CourseRealTime.where(college: @course_real_time.college).order('snapshot_at DESC').limit(1).first
    return if newer_obj.id != @course_real_time.id

    ActionCable.server.broadcast 'course_real_times', course_real_time: @course_real_time
  end
end
