# frozen_string_literal: true

require 'rails_helper'
require 'cgi'

RSpec.describe 'AdminSite::Articles show' do
  describe 'GET /admin/articles/:id' do
    let!(:article) { create(:article) }

    it '200を返し、Inertiaペイロードが含まれていること' do
      get "/admin/articles/#{article.id}"
      expect(response).to have_http_status(:ok)

      match = response.body.match(/data-page="([^"]+)"/)
      expect(match).not_to be_nil

      page_json = CGI.unescapeHTML(match[1])
      json = JSON.parse(page_json)

      expect(json['component']).to eq('admin_site/articles/show')

      expected = {
        'id' => article.id,
        'title' => article.title,
        'status' => article.status,
        'body' => article.body,
        'createdAt' => article.created_at.as_json,
        'updatedAt' => article.updated_at.as_json
      }
      expect(json['props']['article']).to eq(expected)
    end

    it '存在しないIDでは404を返す' do
      get "/admin/articles/#{article.id + 999_999}"
      expect(response).to have_http_status(:not_found)
    end
  end
end
