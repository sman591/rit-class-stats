# frozen_string_literal: true

FactoryBot.define do
  factory :course do
    snapshot_at Faker::Time.between(2.days.ago, Date.today)
    college Faker::Color.color_name
    department Faker::Hipster.word
    course_id Faker::Number.number(3)
    data { { foo: Faker::Color.color_name } }
    capacity_data { { foo: Faker::Color.color_name } }
  end
end
