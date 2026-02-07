# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'UserSite::Articles::Show' do
  describe 'GET /articles/:id' do
    context '公開中の記事の場合' do
      let!(:article) { create(:article, :published, title: 'タイトル', body: '本文') }

      it '200を返し、Inertiaペイロードが含まれていること' do
        get "/articles/#{article.id}"

        expect(response).to have_http_status(:ok)

        expect(inertia).to render_component('user_site/articles/show')

        actual = inertia.props
        actual[:_inertia_meta] = actual[:_inertia_meta].as_json
        expected = {
          flash: {},
          errors: {},
          _inertia_meta: [
            { headKey: 'title',
              innerContent: '記事詳細 | Rails Inertia React Sample',
              tagName: :title }
          ],
          pageHeaderTitle: '記事詳細',
          article: {
            id: article.id,
            title: article.title,
            body: article.body
          }
        }
        expect(actual).to match(expected)
      end
    end

    context '非公開の記事の場合' do
      let!(:article) { create(:article, :draft, title: 'タイトル', body: '本文') }

      it '404を返すこと' do
        get "/articles/#{article.id}"
        expect(response).to have_http_status(:not_found)
      end
    end

    context '存在しない記事IDの場合' do
      it '404を返すこと' do
        get '/articles/999999'
        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
