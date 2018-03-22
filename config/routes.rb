# frozen_string_literal: true

Rails.application.routes.draw do
  scope '/api', controller: :api, as: :api, defaults: { format: :json } do
    get :real_time_all
    post :import
  end

  root 'pages#index'
  get '*path', to: 'pages#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
