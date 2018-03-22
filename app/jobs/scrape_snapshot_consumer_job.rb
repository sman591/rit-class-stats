# frozen_string_literal: true

class ScrapeSnapshotConsumerJob < ApplicationJob
  queue_as :default

  def perform(*args)
    snapshot_id = args[0][:snapshot_id]
    @snapshot = ScrapeSnapshot.find_by_id(snapshot_id)
    return if @snapshot.blank? || @snapshot.consume_started?

    @snapshot.update_attribute(:consume_started_at, Time.now)

    # course_real_time = CourseRealTime.create!(
    CourseRealTime.create!(
      college: @snapshot.college,
      snapshot_at: @snapshot.snapshot_at,
      capacity_data: capacity_data_from_courses(@snapshot.courses)
    )

    @snapshot.update_attribute(:consume_finished_at, Time.now)
    # @snapshot.update_attribute(:course_real_time, course_real_time)
  end

  private

  def capacity_data_from_courses(courses)
    courses.each_with_object({}) do |current, accumulator|
      pp_search_id = current['ppSearchId']
      realtime = current['realtime']
      accumulator[pp_search_id] = {
        wait_cap: realtime['waitCap'],
        wait_total: realtime['waitTotal'],
        enrollment_cap: realtime['enrollmentCap'],
        enrollment_total: realtime['enrollmentTotal']
      }
    end
  end
end
