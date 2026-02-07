# frozen_string_literal: true

require 'rails_helper'
require 'cgi'

RSpec.describe 'UserSite::Articles::Index' do
  describe 'GET /articles' do
    context '公開中の記事が存在する場合' do
      let!(:unpublished_article) { create(:article, :draft) }
      let!(:published_article1) { create(:article, :published, title: 'Published 1') }
      let!(:published_article2) { create(:article, :published, title: 'Published 2') }

      it '200を返し、Inertiaペイロードが含まれていること' do
        get '/articles'

        expect(response).to have_http_status(:ok)

        expect(inertia).to render_component('user_site/articles/index')

        actual = inertia.props
        actual[:_inertia_meta] = actual[:_inertia_meta].as_json
        expected = {
          flash: {},
          errors: {},
          _inertia_meta: [
            { headKey: 'title',
              innerContent: '記事一覧 | Rails Inertia React Sample',
              tagName: :title }
          ],
          pageHeaderTitle: '記事一覧',
          articles: [
            {
              id: published_article2.id,
              title: published_article2.title,
              body: published_article2.body.truncate(30),
              showLinkHref: "/articles/#{published_article2.id}"
            },
            {
              id: published_article1.id,
              title: published_article1.title,
              body: published_article1.body.truncate(30),
              showLinkHref: "/articles/#{published_article1.id}"
            }
          ],
          noDataLabel: 'データがありません。',
          readMoreLabel: '続きを読む'
        }
        expect(actual).to match(expected)
      end
    end

    context '公開中の記事が存在しない場合' do
      it 'returns empty message when no published articles exist' do
        create(:article, :draft)

        get '/articles'

        actual = inertia.props
        actual[:_inertia_meta] = actual[:_inertia_meta].as_json
        expected = {
          flash: {},
          errors: {},
          _inertia_meta: [
            { headKey: 'title',
              innerContent: '記事一覧 | Rails Inertia React Sample',
              tagName: :title }
          ],
          pageHeaderTitle: '記事一覧',
          articles: [],
          noDataLabel: 'データがありません。',
          readMoreLabel: '続きを読む'
        }
        expect(actual).to match(expected)
      end
    end
  end
end
