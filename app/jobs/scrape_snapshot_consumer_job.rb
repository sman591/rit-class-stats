# frozen_string_literal: true

class ScrapeSnapshotConsumerJob < ApplicationJob
  queue_as :default

  def perform(*args)
    snapshot_id = args[0][:snapshot_id]
    @snapshot = ScrapeSnapshot.find_by_id(snapshot_id)
    return if @snapshot.blank? || @snapshot.consume_started?

    @snapshot.update_attribute(:consume_started_at, Time.now)

    # do work

    @snapshot.update_attribute(:consume_finished_at, Time.now)
  end
end
