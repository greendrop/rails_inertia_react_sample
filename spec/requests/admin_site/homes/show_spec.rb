# frozen_string_literal: true

require 'rails_helper'
require 'cgi'

RSpec.describe 'AdminSite::Homes' do
  describe 'GET /admin' do
    it 'GET /admin が 200 を返し、Inertia ペイロードが含まれること' do
      get '/admin'
      expect(response).to have_http_status(:ok)

      match = response.body.match(/data-page="([^"]+)"/)
      expect(match).not_to be_nil

      page_json = CGI.unescapeHTML(match[1])
      json = JSON.parse(page_json)
      expect(json['component']).to eq('admin_site/homes/show')
    end
  end
end
