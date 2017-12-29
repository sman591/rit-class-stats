require 'test_helper'

class CourseRealTimeTest < ActiveSupport::TestCase
  should validate_presence_of :college
  should validate_presence_of :snapshot_at
  should validate_presence_of :capacity_data
end
