# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AdminSite::Articles::IndexPropsGenerator do
  include Rails.application.routes.url_helpers

  describe '#call' do
    subject { described_class.new(articles:, pagination:).call }

    let!(:article1) { create(:article, :draft, title: 'タイトル1') }
    let!(:article2) { create(:article, :draft, title: 'タイトル2') }
    let!(:articles) { [article1, article2] }
    let(:pagination) do
      {
        current_path: '/admin/articles',
        current_query_parameters: { search: 'test' },
        page_param_name: 'page',
        per_page_param_name: 'per',
        current_page: 1,
        limit_value: 10,
        total_pages: 5,
        total_count: 50,
        next_page: 2,
        prev_page: nil,
        first_page?: true,
        last_page?: false,
        out_of_range?: false
      }
    end

    it '記事一覧で使用するpropsを返す' do
      response = subject
      expected = {
        headTitle: '記事一覧 | Admin Site',
        pageHeaderTitle: '記事一覧'
      }
      expected[:articles] = articles.map do |article|
        {
          id: article.id,
          title: article.title,
          status: article.status,
          createdAt: article.created_at,
          updatedAt: article.updated_at,
          showLinkHref: admin_site_article_path(id: article.id)
        }
      end
      expected[:articleFieldNames] = {
        id: 'ID',
        title: 'タイトル',
        status: 'ステータス',
        createdAt: '作成日時',
        updatedAt: '更新日時'
      }
      expected[:pagination] = {
        currentPath: '/admin/articles',
        currentQueryParameters: { search: 'test' },
        pageParameterName: 'page',
        perPageParameterName: 'per',
        currentPage: 1,
        perPage: 10,
        totalPages: 5,
        totalCount: 50,
        nextPage: 2,
        prevPage: nil,
        isFirstPage: true,
        isLastPage: false,
        isOutOfRange: false,
        nextPageLabel: '次へ',
        prevPageLabel: '前へ',
        nextPageAriaLabel: '次のページへ',
        prevPageAriaLabel: '前のページへ'
      }
      expected[:noDataLabel] = 'データがありません。'
      expected[:showLinkLabel] = '詳細'

      expect(response).to eq(expected)
    end
  end
end
