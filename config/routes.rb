Rails.application.routes.draw do
  ### Users ##
  devise_for :users, only: []

  namespace :v1, defaults: { format: :json } do
    resource :login, only: [:create], controller: :sessions
  end

  ### Root ###
  root "links#new"
end
