# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'AdminSite::Articles edit' do
  describe 'GET /admin/articles/:id/edit', :inertia do
    let!(:article) { create(:article) }

    it '200を返し、Inertiaペイロードが含まれていること' do
      get "/admin/articles/#{article.id}/edit"

      expect(response).to have_http_status(:ok)

      expect(inertia).to render_component('admin_site/articles/edit')

      actual = inertia.props
      actual[:_inertia_meta] = actual[:_inertia_meta].as_json
      expected = {
        sidebar: {
          contentItems: [
            { title: 'ホーム', url: '/admin' },
            {
              title: '記事', url: '#',
              items: [
                { title: '記事一覧', url: '/admin/articles' },
                { title: '記事作成', url: '/admin/articles/new' }
              ]
            }
          ]
        },
        flash: {},
        errors: {},
        _inertia_meta: [
          { headKey: 'title',
            innerContent: '記事編集 | Rails Inertia React Sample - Admin Site',
            tagName: :title }
        ],
        pageHeaderTitle: '記事編集',
        breadcrumb: {
          items: [
            { key: 'homes#show', label: 'ホーム', href: '/admin', isActive: false },
            { key: 'articles#index', label: '記事一覧', href: '/admin/articles', isActive: false },
            { key: 'articles#show', label: '記事詳細', href: "/admin/articles/#{article.id}",
              isActive: false },
            { key: 'articles#edit', label: '記事編集', href: "/admin/articles/#{article.id}/edit",
              isActive: true }
          ]
        },
        formAction: "/admin/articles/#{article.id}",
        form: {
          title: article.title,
          body: article.body,
          status: article.status,
          publishedAt: ''
        },
        formFieldNames: {
          title: 'タイトル',
          body: '本文',
          status: 'ステータス',
          publishedAt: '公開日時'
        },
        statusOptions: [
          { label: '下書き', value: 'draft' },
          { label: '公開', value: 'published' }
        ],
        submitButtonLabel: '更新',
        formErrorAlertTitle: '入力内容を確認してください。'
      }
      expect(actual).to eq(expected)
    end

    it '存在しないIDでは404を返す' do
      get "/admin/articles/#{article.id + 999_999}"
      expect(response).to have_http_status(:not_found)
    end
  end
end
