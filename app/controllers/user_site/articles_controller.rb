# frozen_string_literal: true

module UserSite
  class ArticlesController < UserSite::ApplicationController
    def index
      articles = Article.published.order(published_at: :desc, created_at: :desc, id: :desc)
      props = UserSite::Articles::IndexPropsGenerator.call(articles:)
      meta = UserSite::Articles::IndexMetaGenerator.call
      render inertia: props, meta:
    end

    def show
      article = Article.published.find(params[:id])
      props = UserSite::Articles::ShowPropsGenerator.call(article:)
      meta = UserSite::Articles::ShowMetaGenerator.call
      render inertia: props, meta:
    end
  end
end
