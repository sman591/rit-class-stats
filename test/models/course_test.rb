# frozen_string_literal: true

require 'test_helper'

class CourseTest < ActiveSupport::TestCase
  should validate_presence_of :college
  should validate_presence_of :department
  should validate_presence_of :course_id
  should validate_presence_of :snapshot_at
  should validate_presence_of :data
  should validate_presence_of :capacity_data

  should validate_uniqueness_of(:course_id)
end
