# frozen_string_literal: true

require 'rails_helper'
require 'cgi'

RSpec.describe 'AdminSite::Homes' do
  describe 'GET /admin' do
    it 'GET /admin が 200 を返し、Inertia ペイロードが含まれること' do
      get '/admin'
      expect(response).to have_http_status(:ok)

      raise 'Not Found Inertia payload' unless response.body =~ /data-page="([^"]+)"/

      page_json = CGI.unescapeHTML(Regexp.last_match(1))
      json = JSON.parse(page_json)
      expect(json['component']).to eq('AdminSite/Homes/Show')
    end
  end
end
