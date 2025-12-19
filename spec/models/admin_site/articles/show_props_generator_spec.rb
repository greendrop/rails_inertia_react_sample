# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AdminSite::Articles::ShowPropsGenerator do
  describe '#call' do
    subject { described_class.new(article:).call }

    let!(:article) do
      create(:article, :draft, title: 'タイトル', body: '<p>本文</p>')
    end

    it '記事詳細で使用するpropsを返す' do
      response = subject
      expected = {
        headTitle: '記事詳細 | Admin Site',
        pageHeaderTitle: '記事詳細',
        breadcrumb: {
          items: [
            { key: 'homes#show', label: 'ホーム', href: '/admin', isActive: false },
            { key: 'articles#index', label: '記事一覧', href: '/admin/articles', isActive: false },
            { key: 'articles#show', label: '記事詳細', href: "/admin/articles/#{article.id}", isActive: true }
          ]
        },
        article: {
          id: article.id,
          title: article.title,
          status: article.status,
          body: article.body,
          createdAt: article.created_at,
          updatedAt: article.updated_at
        },
        articleFieldNames: {
          id: 'ID',
          title: 'タイトル',
          status: 'ステータス',
          body: '本文',
          createdAt: '作成日時',
          updatedAt: '更新日時'
        }
      }
      expect(response).to eq(expected)
    end
  end
end
