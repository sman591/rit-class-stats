# frozen_string_literal: true

require 'test_helper'

class ScrapeSnapshotTest < ActiveSupport::TestCase
  should validate_presence_of :college
  should validate_presence_of :snapshot_at
  should validate_presence_of :courses
end
