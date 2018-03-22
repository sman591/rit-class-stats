# frozen_string_literal: true

require 'test_helper'

class ScrapeSnapshotConsumerJobTest < ActiveJob::TestCase
  test 'job is executed' do
    snapshot = create(:scrape_snapshot, courses: courses)
    ScrapeSnapshotConsumerJob.perform_now(snapshot_id: snapshot.id)
    snapshot.reload
    assert_equal true, snapshot.consume_started?
    assert_equal true, snapshot.consume_finished?
    capacity_data = CourseRealTime.last.capacity_data
    assert_equal 10, capacity_data['1-1-1-1-1']['enrollment_cap']
  end

  private

  def courses
    [{
      'ppSearchId': '1-1-1-1-1',
      'realtime': {
        'enrollmentCap': 10,
        'enrollmentTotal': 5,
        'waitCap': 2,
        'waitTotal': 1
      }
    }]
  end
end
