# frozen_string_literal: true

class ScrapeSnapshotConsumerJob < ApplicationJob
  queue_as :default

  def perform(*args)
    snapshot_id = args[0][:snapshot_id]
    @snapshot = ScrapeSnapshot.find_by_id(snapshot_id)
    return if @snapshot.blank? || @snapshot.consume_started?

    @snapshot.update_attribute(:consume_started_at, Time.now)

    course_real_time = CourseRealTime.create!(
      college: @snapshot.college,
      snapshot_at: @snapshot.snapshot_at,
      capacity_data: capacity_data_from_courses(@snapshot.courses)
    )

    update_courses(@snapshot.courses, course_real_time)

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

  def update_courses(courses, course_real_time)
    courses.each do |current|
      pp_search_id = current['ppSearchId']
      attributes = {
        college: course_real_time.college,
        department: current['subject'],
        course_id: pp_search_id
      }
      Course.where(attributes).first_or_initialize(attributes).tap do |course|
        course.snapshot_at = course_real_time.snapshot_at
        course.data = current
        course.capacity_data = course_real_time.capacity_data[pp_search_id]
        course.save!
      end
    end
  end
end
