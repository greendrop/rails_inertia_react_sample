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

      expected = articles.map do |article|
        {
          'id' => article.id,
          'title' => article.title,
          'status' => article.status,
          'createdAt' => article.created_at.as_json,
          'updatedAt' => article.updated_at.as_json
        }
      end
      expect(json['props']['articles']).to eq(expected)

      expected = {
        'id' => 'ID',
        'title' => 'タイトル',
        'status' => 'ステータス',
        'createdAt' => '作成日時',
        'updatedAt' => '更新日時'
      }
      expect(json['props']['articleColumnNames']).to eq(expected)

      expected = {
        'currentPath' => '/admin/articles',
        'currentQueryParameters' => {},
        'pageParameterName' => 'page',
        'perPageParameterName' => 'per',
        'currentPage' => 1,
        'perPage' => 20,
        'totalPages' => 1,
        'totalCount' => 3,
        'nextPage' => nil,
        'prevPage' => nil,
        'isFirstPage' => true,
        'isLastPage' => true,
        'isOutOfRange' => false,
        'nextPageLabel' => '次へ',
        'prevPageLabel' => '前へ',
        'nextPageAriaLabel' => '次のページへ',
        'prevPageAriaLabel' => '前のページへ'
      }
      expect(json['props']['pagination']).to eq(expected)
    end
  end
end
