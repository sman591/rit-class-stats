# frozen_string_literal: true

Rails.application.routes.draw do
  require 'sidekiq/web'
  mount Sidekiq::Web => '/sidekiq'

  scope '/api', controller: :api, as: :api, defaults: { format: :json } do
    get :real_time_all
    get 'courses/:college', to: 'api#courses', as: 'courses'
    post :import
  end

  root 'pages#index'
  get '*path', to: 'pages#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
