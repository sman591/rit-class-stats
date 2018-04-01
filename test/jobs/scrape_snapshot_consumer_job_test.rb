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

  test 'job should create courses' do
    snapshot = create(:scrape_snapshot, courses: courses)
    assert_difference 'Course.count', 1 do
      ScrapeSnapshotConsumerJob.perform_now(snapshot_id: snapshot.id)
    end
  end

  test 'job should update courses' do
    snapshot = create(:scrape_snapshot, courses: courses, snapshot_at: 5.minutes.ago)
    course = create(:course, college: snapshot.college, department: 'abc', course_id: '1-1-1-1-1', snapshot_at: 2.days.ago)
    assert_difference 'Course.count', 0 do
      ScrapeSnapshotConsumerJob.perform_now(snapshot_id: snapshot.id)
    end
    assert course.reload.snapshot_at > 1.day.ago, 'snapshot_at is old, expected to be recent'
  end

  test 'job should not update courses with old data' do
    snapshot = create(:scrape_snapshot, courses: courses, snapshot_at: 2.days.ago)
    course = create(:course, college: snapshot.college, department: 'abc', course_id: '1-1-1-1-1', snapshot_at: 5.minutes.ago)
    assert_difference 'Course.count', 0 do
      ScrapeSnapshotConsumerJob.perform_now(snapshot_id: snapshot.id)
    end
    assert course.reload.snapshot_at > 1.day.ago, 'snapshot_at is old, expected to be recent'
  end

  private

  def courses
    [{
      'ppSearchId': '1-1-1-1-1',
      'subject': 'abc',
      'realtime': {
        'enrollmentCap': 10,
        'enrollmentTotal': 5,
        'waitCap': 2,
        'waitTotal': 1
      }
    }]
  end
end
