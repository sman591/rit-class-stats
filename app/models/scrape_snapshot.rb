class ScrapeSnapshot < ApplicationRecord
  validates_presence_of :college
  validates_presence_of :snapshot_at
  validates_presence_of :courses
  # validates_inclusion_of :college, in: %w( ... )
end
