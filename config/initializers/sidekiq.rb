# frozen_string_literal: true

Rails.application.config.active_job.queue_adapter = :sidekiq

if Rails.env.production?
  pass = ENV['REDIS_PASSWORD']

  Sidekiq.configure_server do |config|
    config.redis = { url: "redis://:#{pass}@redis:6379/15" }
  end

  Sidekiq.configure_client do |config|
    config.redis = { url: "redis://:#{pass}@redis:6379/15" }
  end
end
