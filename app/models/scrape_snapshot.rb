# frozen_string_literal: true

class ScrapeSnapshot < ApplicationRecord
  validates_presence_of :college
  validates_presence_of :snapshot_at
  validates_presence_of :courses
  # validates_inclusion_of :college, in: %w( ... )

  def consume_started?
    consume_started_at?
  end

  def consume_finished?
    consume_finished_at?
  end
end
