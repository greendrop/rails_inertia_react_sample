# frozen_string_literal: true

require 'rails_helper'
require 'cgi'

RSpec.describe 'UserSite::Articles::Index' do
  describe 'GET /articles' do
    it 'returns only published articles ordered by published_at desc' do
      older = create(:article, :published, title: 'Old', published_at: 2.days.ago)
      newer = create(:article, :published, title: 'New', published_at: 1.day.ago)
      create(:article, :draft, title: 'Draft')

      get '/articles'

      expect(response).to have_http_status(:ok)

      json = inertia_page_json(response)
      expect(json['component']).to eq('user_site/articles/index')

      props = json['props']
      expect(props['page_title']).to eq('記事一覧')
      expect(props['empty_message']).to eq('表示できる記事がありません')

      article_titles = props['articles'].pluck('title')
      expect(article_titles).to eq([newer.title, older.title])
      expect(props['articles']).to all(include('detail_url'))
    end

    it 'returns empty message when no published articles exist' do
      create(:article, :draft)

      get '/articles'

      json = inertia_page_json(response)
      expect(json['props']['articles']).to be_empty
      expect(json['props']['empty_message']).to eq('表示できる記事がありません')
    end
  end

  def inertia_page_json(response)
    match = response.body.match(/data-page="([^"]+)"/)
    expect(match).not_to be_nil

    page_json = CGI.unescapeHTML(match[1])
    JSON.parse(page_json)
  end
end
