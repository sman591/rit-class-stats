FactoryBot.define do
  factory :scrape_snapshot do
    snapshot_at Faker::Time.between(2.days.ago, Date.today)
    consume_started_at nil
    consume_finished_at nil
    college Faker::Color.color_name
    courses [ { foo: Faker::Color.color_name } ]
  end
end
