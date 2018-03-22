# frozen_string_literal: true

FactoryBot.define do
  factory :scrape_snapshot do
    snapshot_at Faker::Time.between(2.days.ago, Date.today)
    consume_started_at nil
    consume_finished_at nil
    college Faker::Color.color_name
    courses [{
      ppSearchId: Faker::Color.color_name,
      realtime: {
        enrollStatus: 'O',
        enrollmentCap: 10,
        enrollmentTotal: 5,
        reserved: [],
        waitCap: 2,
        waitTotal: 1
      }
    }]
  end
end
