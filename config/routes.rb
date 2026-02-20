Rails.application.routes.draw do
  root "main#index"
  get "/contact", to: "main#contact"
  post "/contact", to: "main#submit_contact"
  get "up" => "rails/health#show", as: :rails_health_check
end
