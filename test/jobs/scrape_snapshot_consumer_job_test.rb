# frozen_string_literal: true

require 'test_helper'

class ScrapeSnapshotConsumerJobTest < ActiveJob::TestCase
  test 'job is executed' do
    snapshot = create(:scrape_snapshot)
    ScrapeSnapshotConsumerJob.perform_now(snapshot_id: snapshot.id)
    snapshot.reload
    assert_equal true, snapshot.consume_started?
    assert_equal true, snapshot.consume_finished?
  end
end
