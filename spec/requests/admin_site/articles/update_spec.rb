# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'AdminSite::Articles update' do
  describe 'PATCH /admin/articles/:id' do
    let!(:article) { create(:article) }

    context '有効なパラメーターの場合' do
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

      it '記事を更新してリダイレクトする' do
        patch "/admin/articles/#{article.id}", params: valid_params

        expect(response).to redirect_to("/admin/articles/#{article.id}")
        expect(flash[:notice]).to eq('記事が更新されました。')

        article.reload
        expect(article.title).to eq('更新後のタイトル')
        expect(article.body).to eq('更新後の本文')
        expect(article.status).to eq('published')
        expect(article.published_at).to eq(Time.zone.parse('2025-12-31T12:00'))
      end
    end

    context '無効なパラメーターの場合' do
      let!(:invalid_params) do
        {
          article: {
            title: '',
            body: '更新後の本文',
            status: 'published',
            published_at: '2025-12-31T12:00'
          }
        }
      end

      it '422とエラー情報を返す' do
        patch "/admin/articles/#{article.id}", params: invalid_params

        expect(response).to have_http_status(:unprocessable_content)

        expect(inertia).to render_component('admin_site/articles/edit')
        expect(inertia.props[:errors]).to match({ title: ['タイトルを入力してください'] })
        expect(inertia.props[:form]).to match(
          {
            title: '',
            body: '更新後の本文',
            status: 'published',
            publishedAt: '2025-12-31T12:00'
          }
        )
      end
    end

    context '存在しない記事IDの場合' do
      it '404を返す' do
        patch "/admin/articles/#{article.id + 999_999}"
        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
