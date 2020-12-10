require 'net/http'
class PingWorker
  include Sidekiq::Worker

  sidekiq_options queue: :ping

  def perform(*args)
    # 通信したい先のherokuのURLを指定します
    uri = URI.parse("https://portfolio-2020-12-9.herokuapp.com/")
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    p http.get(uri.request_uri)
  end
end