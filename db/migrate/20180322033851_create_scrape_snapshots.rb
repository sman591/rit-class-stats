class CreateScrapeSnapshots < ActiveRecord::Migration[5.1]
  def change
    create_table :scrape_snapshots do |t|
      t.datetime :snapshot_at
      t.datetime :consume_started_at
      t.datetime :consume_finished_at
      t.citext :college
      t.jsonb :courses

      t.timestamps
    end
  end
end
