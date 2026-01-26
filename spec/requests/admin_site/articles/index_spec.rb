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

      expected = {
        '_inertia_meta' => [
          { 'headKey' => 'title',
            'innerContent' => '記事一覧 | Rails Inertia React Sample - Admin Site',
            'tagName' => 'title' }
        ],
        'pageHeaderTitle' => '記事一覧',
        'breadcrumb' => {
          'items' => [
            { 'key' => 'homes#show', 'label' => 'ホーム', 'href' => '/admin', 'isActive' => false },
            { 'key' => 'articles#index', 'label' => '記事一覧', 'href' => '/admin/articles', 'isActive' => true }
          ]
        }
      }
      expected['articles'] = articles.map do |article|
        {
          'id' => article.id,
          'title' => article.title,
          'status' => article.status,
          'createdAt' => article.created_at.as_json,
          'updatedAt' => article.updated_at.as_json,
          'showLinkHref' => "/admin/articles/#{article.id}",
          'destroyLinkHref' => "/admin/articles/#{article.id}"
        }
      end
      expected['articleFieldNames'] = {
        'id' => 'ID',
        'title' => 'タイトル',
        'status' => 'ステータス',
        'createdAt' => '登録日時',
        'updatedAt' => '更新日時',
        'operations' => '操作'
      }
      expected['pagination'] = {
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
      expected['noDataLabel'] = 'データがありません。'
      expected['showLinkLabel'] = '詳細'
      expected['newLinkLabel'] = '作成'
      expected['newLinkHref'] = '/admin/articles/new'
      expected['destroyButtonLabel'] = '削除'
      expected['destroyConfirmMessage'] = '記事を削除しますか？'

      except_keys = %w[flash errors sidebar]
      expect(json['props'].except(*except_keys)).to eq(expected)
    end
  end
end
