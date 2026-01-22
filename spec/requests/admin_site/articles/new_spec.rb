# frozen_string_literal: true

require 'rails_helper'
require 'cgi'

RSpec.describe 'AdminSite::Articles new' do
  describe 'GET /admin/articles/new' do
    it '200を返し、Inertiaペイロードが含まれていること' do
      get '/admin/articles/new'
      expect(response).to have_http_status(:ok)

      match = response.body.match(/data-page="([^"]+)"/)
      expect(match).not_to be_nil

      page_json = CGI.unescapeHTML(match[1])
      json = JSON.parse(page_json)

      expect(json['component']).to eq('admin_site/articles/new')

      expected = {
        '_inertia_meta' => [
          { 'headKey' => 'title',
            'innerContent' => '記事作成 | Rails Inertia React Sample - Admin Site',
            'tagName' => 'title' }
        ],
        'pageHeaderTitle' => '記事作成',
        'breadcrumb' => {
          'items' => [
            { 'key' => 'homes#show', 'label' => 'ホーム', 'href' => '/admin', 'isActive' => false },
            { 'key' => 'articles#new', 'label' => '記事作成', 'href' => '/admin/articles/new', 'isActive' => true }
          ]
        },
        'formAction' => '/admin/articles',
        'form' => {
          'title' => '',
          'body' => '',
          'status' => 'draft',
          'publishedAt' => ''
        },
        'formFieldNames' => {
          'title' => 'タイトル',
          'body' => '本文',
          'status' => 'ステータス',
          'publishedAt' => '公開日時'
        },
        'statusOptions' => [
          { 'label' => '下書き', 'value' => 'draft' },
          { 'label' => '公開', 'value' => 'published' }
        ],
        'submitButtonLabel' => '作成',
        'formErrorAlertTitle' => '入力内容を確認してください。'
      }

      except_keys = %w[flash errors sidebar]
      expect(json['props'].except(*except_keys)).to eq(expected)
    end
  end
end
