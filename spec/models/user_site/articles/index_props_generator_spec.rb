# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UserSite::Articles::IndexPropsGenerator do
  include Rails.application.routes.url_helpers
  include ActionView::Helpers::TextHelper

  describe '#call' do
    subject { described_class.new(articles:).call }

    let!(:article1) { create(:article, :published, title: 'タイトル1', body: '本文1') }
    let!(:article2) { create(:article, :published, title: 'タイトル2', body: '本文2') }
    let!(:articles) { [article1, article2] }

    it '記事一覧で使用するpropsを返す' do
      response = subject
      expected = {
        pageHeaderTitle: '記事一覧',
        articles: articles.map do |article|
          {
            id: article.id,
            title: article.title,
            body: truncate(article.body),
            showLinkHref: user_site_article_path(id: article.id)
          }
        end,
        noDataLabel: 'データがありません。',
        readMoreLabel: '続きを読む'
      }

      expect(response).to eq(expected)
    end
  end
end
