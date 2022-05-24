Rails.application.routes.draw do
  resources :stock_joins, only: [:index, :create]
  resources :alert_joins
  resources :alerts
  resources :stocks, only: [:index, :create, :update]
  resources :users, only: [:index, :update]

  delete "/stock_joins/:stock_id/:user_id", to: "stock_joins#custom_destroy"

  get "/stocks/:ticker", to: "stocks#show"
  
  get "/auto_login", to: "users#show"
  post "/sign_up", to: "users#create"

  post '/login_back', to: "sessions#create"
  delete '/logout_back', to: "sessions#destroy"

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
