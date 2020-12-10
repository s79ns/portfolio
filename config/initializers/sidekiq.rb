schedule_file = "config/schedule.yml"

Sidekiq.configure_server do |config|
  if Rails.env.production?
    config.redis = { url: ENV.fetch('p56e546a735ce4a1988aacc2c77f743daae7b6f6a4351395fe40c841c23a8d4ab@ec2-34-192-46-42.compute-1.amazonaws.com:27079') }
  end
end
Sidekiq.configure_client do |config|
  if Rails.env.production?
    config.redis = { url: ENV.fetch('p56e546a735ce4a1988aacc2c77f743daae7b6f6a4351395fe40c841c23a8d4ab@ec2-34-192-46-42.compute-1.amazonaws.com:27079') }
  end
end

if File.exist?(schedule_file) && Sidekiq.server?
  Sidekiq::Cron::Job.load_from_hash YAML.load_file(schedule_file)
end