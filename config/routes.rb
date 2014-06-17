Rails.application.routes.draw do
  ### Users ###

  devise_for :users, controllers: {
    registrations: "users/registrations",
    omniauth_callbacks: "users/authentications"
  }

  namespace :users, as: :user do
    namespace :authentications, as: :authentication, path: :auth do
      delete "/:provider" => :destroy
    end
  end

  ### Static Pages ###

  namespace :static_pages, path: '', constraints: { subdomain: 'docs' } do
    get :about
  end

  ### API ###

  constraints subdomain: 'api' do
    mount Nazrin::API => "/"
  end

  ### Links ###

  resources :links
  get "/:token" => "links#go"

  ### Root ###

  root "links#new"
end
