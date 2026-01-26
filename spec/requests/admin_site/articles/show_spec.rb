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
        '_inertia_meta' => [
          { 'headKey' => 'title',
            'innerContent' => '記事詳細 | Rails Inertia React Sample - Admin Site',
            'tagName' => 'title' }
        ],
        'pageHeaderTitle' => '記事詳細',
        'breadcrumb' => {
          'items' => [
            { 'key' => 'homes#show', 'label' => 'ホーム', 'href' => '/admin', 'isActive' => false },
            { 'key' => 'articles#index', 'label' => '記事一覧', 'href' => '/admin/articles', 'isActive' => false },
            { 'key' => 'articles#show', 'label' => '記事詳細', 'href' => "/admin/articles/#{article.id}",
              'isActive' => true }
          ]
        },
        'article' => {
          'id' => article.id,
          'title' => article.title,
          'status' => article.status,
          'body' => article.body,
          'createdAt' => article.created_at.as_json,
          'updatedAt' => article.updated_at.as_json
        },
        'articleFieldNames' => {
          'id' => 'ID',
          'title' => 'タイトル',
          'status' => 'ステータス',
          'body' => '本文',
          'createdAt' => '登録日時',
          'updatedAt' => '更新日時'
        },
        'editButtonLabel' => '編集',
        'editLinkHref' => "/admin/articles/#{article.id}/edit",
        'destroyButtonLabel' => '削除',
        'destroyConfirmMessage' => '記事を削除しますか？',
        'destroyLinkHref' => "/admin/articles/#{article.id}"
      }
      except_keys = %w[flash errors sidebar]
      expect(json['props'].except(*except_keys)).to eq(expected)
    end

    it '存在しないIDでは404を返す' do
      get "/admin/articles/#{article.id + 999_999}"
      expect(response).to have_http_status(:not_found)
    end
  end
end
