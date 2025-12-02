# frozen_string_literal: true

require 'rails_helper'
require 'cgi'

RSpec.describe 'AdminSite::Articles' do
  describe 'GET /admin/articles' do
    it 'returns 200 and includes Inertia payload with the correct component' do
      get '/admin/articles'
      expect(response).to have_http_status(:ok)

      match = response.body.match(/data-page="([^"]+)"/)
      expect(match).not_to be_nil

      page_json = CGI.unescapeHTML(match[1])
      json = JSON.parse(page_json)
      expect(json['component']).to eq('admin_site/articles/index')
    end
  end
end
