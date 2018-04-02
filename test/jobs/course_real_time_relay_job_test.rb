require 'test_helper'

class CourseRealTimeRelayJobTest < ActiveJob::TestCase
  include ActionCable::TestHelper

  test 'job is executed' do
    course_real_time = create(:course_real_time)
    assert_broadcasts 'course_real_times', 0
    CourseRealTimeRelayJob.perform_now(course_real_time_id: course_real_time.id)
    assert_broadcasts 'course_real_times', 1
  end

  test 'job is not executed when a newer object exists' do
    course_real_time = create(:course_real_time, snapshot_at: 2.days.ago, college: 'foo')
    create(:course_real_time, snapshot_at: 1.hour.ago, college: 'foo')
    assert_broadcasts 'course_real_times', 0
    CourseRealTimeRelayJob.perform_now(course_real_time_id: course_real_time.id)
    assert_broadcasts 'course_real_times', 0
  end
end
