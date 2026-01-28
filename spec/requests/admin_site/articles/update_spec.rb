# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'AdminSite::Articles update' do
  describe 'PATCH /admin/articles/:id', :inertia do
    let!(:article) { create(:article) }
    let!(:valid_params) do
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

      expect(inertia).to render_component('admin_site/articles/edit')
      expect(inertia.props[:errors]).to eq({ title: ['タイトルを入力してください'] })
      expect(inertia.props[:form]).to eq(
        {
          title: '',
          body: '更新後の本文',
          status: 'published',
          publishedAt: '2025-12-31T12:00'
        }
      )
    end

    it '存在しないIDでは404を返す' do
      patch "/admin/articles/#{article.id + 999_999}", params: valid_params
      expect(response).to have_http_status(:not_found)
    end
  end
end
