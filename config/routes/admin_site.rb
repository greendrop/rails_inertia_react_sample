# frozen_string_literal: true

scope module: :admin_site, path: '/admin', as: :admin_site do
  root to: 'homes#show'
end
