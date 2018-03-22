# frozen_string_literal: true

require 'test_helper'

class ScrapeSnapshotTest < ActiveSupport::TestCase
  should validate_presence_of :college
  should validate_presence_of :snapshot_at
  should validate_presence_of :courses

  test '#consume_started?, #consume_finished?' do
    snapshot = build(:scrape_snapshot, consume_started_at: nil, consume_finished_at: nil)
    assert_equal false, snapshot.consume_started?
    assert_equal false, snapshot.consume_finished?
    snapshot = build(:scrape_snapshot, consume_started_at: 2.hours.ago, consume_finished_at: nil)
    assert_equal true, snapshot.consume_started?
    assert_equal false, snapshot.consume_finished?
    snapshot = build(:scrape_snapshot, consume_started_at: 2.hours.ago, consume_finished_at: 1.hour.ago)
    assert_equal true, snapshot.consume_started?
    assert_equal true, snapshot.consume_finished?
  end
end
