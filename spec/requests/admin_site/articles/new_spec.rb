# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'AdminSite::Articles new' do
  describe 'GET /admin/articles/new' do
    it '200を返し、Inertiaペイロードが含まれていること' do
      get '/admin/articles/new'

      expect(response).to have_http_status(:ok)

      expect(inertia).to render_component('admin_site/articles/new')

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
            innerContent: '記事作成 | Rails Inertia React Sample - Admin Site',
            tagName: :title }
        ],
        pageHeaderTitle: '記事作成',
        breadcrumb: {
          items: [
            { key: 'homes#show', label: 'ホーム', href: '/admin', isActive: false },
            { key: 'articles#new', label: '記事作成', href: '/admin/articles/new', isActive: true }
          ]
        },
        formAction: '/admin/articles',
        form: {
          title: '',
          body: '',
          status: 'draft',
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
        submitButtonLabel: '作成',
        formErrorAlertTitle: '入力内容を確認してください。'
      }
      expect(actual).to match(expected)
    end
  end
end
