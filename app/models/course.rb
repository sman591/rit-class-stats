# frozen_string_literal: true

class Course < ApplicationRecord
  validates_presence_of :college
  validates_presence_of :department
  validates_presence_of :course_id
  validates_presence_of :snapshot_at
  validates_presence_of :data
  validates_presence_of :capacity_data
  # validates_inclusion_of :college, in: %w( ... )

  validates :course_id, uniqueness: { case_sensitive: false, scope: 'department' }

  def public_id
    code = data['catalogNumber']
    section = data['section']
    "#{department} #{code}-#{section}"
  end
end
