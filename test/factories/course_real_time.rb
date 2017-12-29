FactoryBot.define do
  factory :course_real_time do
    snapshot_at Faker::Time.between(2.days.ago, Date.today)
    college Faker::Color.color_name
    capacity_data { { foo: Faker::Color.color_name } }
  end
end
