# frozen_string_literal: true

class CourseRealTime < ApplicationRecord
  validates_presence_of :college
  validates_presence_of :snapshot_at
  validates_presence_of :capacity_data
  # validates_inclusion_of :college, in: %w( ... )
end
