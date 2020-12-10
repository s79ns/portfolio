Rails.application.routes.draw do
  get 'games/index'
  get 'tops/index'
  root "tops#index"
  require 'sidekiq/web'
  require 'sidekiq/cron/web'
    # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    mount Sidekiq::Web => '/sidekiq'
end