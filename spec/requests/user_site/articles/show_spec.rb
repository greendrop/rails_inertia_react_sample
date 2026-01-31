# frozen_string_literal: true

require 'rails_helper'
require 'cgi'

RSpec.describe 'UserSite::Articles::Show' do
  describe 'GET /articles/:id' do
    it 'returns published article data' do
      article = create(:article, :published, title: 'Published title', body: "First line\nSecond line")

      get "/articles/#{article.id}"

      expect(response).to have_http_status(:ok)
      json = inertia_page_json(response)
      expect(json['component']).to eq('user_site/articles/show')
      props = json['props']
      expect(props['page_title']).to eq(article.title)
      expect(props['index_url']).to eq('/articles')
      expect(props['article']).to include(
        'id' => article.id,
        'title' => article.title,
        'body' => article.body
      )
    end

    it 'responds with 404 for non-published article' do
      article = create(:article, :draft)

      get "/articles/#{article.id}"

      expect(response).to have_http_status(:not_found)
    end
  end

  def inertia_page_json(response)
    match = response.body.match(/data-page="([^"]+)"/)
    expect(match).not_to be_nil

    page_json = CGI.unescapeHTML(match[1])
    JSON.parse(page_json)
  end
end
