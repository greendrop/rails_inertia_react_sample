# frozen_string_literal: true

scope module: :user_site, path: '/', as: :user_site do
  root to: 'homes#show'

  resources :articles, only: %i[index show]
end
