schedule_file = "config/schedule.yml"

Sidekiq.configure_server do |config|
  if Rails.env.production?
    config.redis = { url: ENV.fetch('REDIS_URL') }
  end
end
Sidekiq.configure_client do |config|
  if Rails.env.production?
    config.redis = { url: ENV.fetch('REDIS_URL') }
  end
end

if File.exist?(schedule_file) && Sidekiq.server?
  Sidekiq::Cron::Job.load_from_hash YAML.load_file(schedule_file)
end