Rails.application.routes.draw do
  get 'tops/index'
  root "tops#index"
end
