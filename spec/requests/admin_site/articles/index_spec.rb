# frozen_string_literal: true

require 'rails_helper'
require 'cgi'

RSpec.describe 'AdminSite::Articles' do
  describe 'GET /admin/articles' do
    let!(:articles) { create_list(:article, 3) }

    it '200を返し、Inertiaペイロードが含まれていること' do
      get '/admin/articles'
      expect(response).to have_http_status(:ok)

      match = response.body.match(/data-page="([^"]+)"/)
      expect(match).not_to be_nil

      page_json = CGI.unescapeHTML(match[1])
      json = JSON.parse(page_json)
      expect(json['component']).to eq('admin_site/articles/index')
      expect(json['props']['articles']).to eq(articles.reverse.as_json(only: %i[id title status created_at updated_at]))
    end
  end
end
