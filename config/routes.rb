Rails.application.routes.draw do
  scope '/api', controller: :api, as: :api, defaults: { format: :json } do
    get :real_time_all
    post :import
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
