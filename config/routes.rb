Rails.application.routes.draw do
  get 'games/index'
  get 'tops/index'
  root "tops#index"
end
