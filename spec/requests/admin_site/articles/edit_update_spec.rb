# frozen_string_literal: true

require 'rails_helper'
require 'cgi'

RSpec.describe 'AdminSite::Articles edit/update' do
  def inertia_component_json(response)
    match = response.body.match(/data-page="([^"]+)"/)
    expect(match).not_to be_nil

    page_json = CGI.unescapeHTML(match[1])
    JSON.parse(page_json)
  end

  describe 'GET /admin/articles/:id/edit' do
    let!(:article) { create(:article) }

    it '200を返し、Inertiaペイロードが含まれていること' do
      get "/admin/articles/#{article.id}/edit"
      expect(response).to have_http_status(:ok)

      json = inertia_component_json(response)
      expect(json['component']).to eq('admin_site/articles/edit')

      expected = {
        '_inertia_meta' => [
          { 'headKey' => 'title',
            'innerContent' => '記事編集 | Rails Inertia React Sample - Admin Site',
            'tagName' => 'title' }
        ],
        'pageHeaderTitle' => '記事編集',
        'breadcrumb' => {
          'items' => [
            { 'key' => 'homes#show', 'label' => 'ホーム', 'href' => '/admin', 'isActive' => false },
            { 'key' => 'articles#index', 'label' => '記事一覧', 'href' => '/admin/articles', 'isActive' => false },
            { 'key' => 'articles#show', 'label' => '記事詳細', 'href' => "/admin/articles/#{article.id}",
              'isActive' => false },
            { 'key' => 'articles#edit', 'label' => '記事編集', 'href' => "/admin/articles/#{article.id}/edit",
              'isActive' => true }
          ]
        },
        'formAction' => "/admin/articles/#{article.id}",
        'form' => {
          'title' => article.title,
          'body' => article.body,
          'status' => article.status,
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
        'submitButtonLabel' => '更新',
        'formErrorAlertTitle' => '入力内容を確認してください。'
      }

      except_keys = %w[flash errors sidebar]
      expect(json['props'].except(*except_keys)).to eq(expected)
    end
  end

  describe 'PATCH /admin/articles/:id' do
    let!(:article) { create(:article) }

    let(:valid_params) do
      {
        article: {
          title: '更新後のタイトル',
          body: '更新後の本文',
          status: 'published',
          published_at: '2025-12-31T12:00'
        }
      }
    end

    it '有効なパラメータなら記事を更新してリダイレクトする' do
      patch "/admin/articles/#{article.id}", params: valid_params

      expect(response).to redirect_to("/admin/articles/#{article.id}")
      expect(flash[:notice]).to eq('記事が更新されました。')

      article.reload
      expect(article.title).to eq('更新後のタイトル')
      expect(article.body).to eq('更新後の本文')
      expect(article.status).to eq('published')
      expect(article.published_at).to eq(Time.zone.parse('2025-12-31T12:00'))
    end

    it '無効なパラメータなら422とエラー情報を返す' do
      invalid_params = valid_params.deep_dup
      invalid_params[:article][:title] = ''

      patch "/admin/articles/#{article.id}", params: invalid_params

      expect(response).to have_http_status(:unprocessable_content)

      json = inertia_component_json(response)
      expect(json['component']).to eq('admin_site/articles/edit')
      expect(json['props']['errors']).to include('title' => include('タイトルを入力してください'))
      expect(json['props']['form']).to include('body' => '更新後の本文')
    end

    it '存在しないIDでは404を返す' do
      patch "/admin/articles/#{article.id + 999_999}", params: valid_params
      expect(response).to have_http_status(:not_found)
    end
  end
end
