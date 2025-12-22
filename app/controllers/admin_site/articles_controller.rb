# frozen_string_literal: true

module AdminSite
  class ArticlesController < ApplicationController
    def index
      articles = Article.order(id: :asc).page(page).per(per_page)

      props = AdminSite::Articles::IndexPropsGenerator.call(
        articles:,
        pagination: props_generator_pagination_args_by_kaminari(articles)
      )
      meta = AdminSite::Articles::IndexMetaGenerator.call
      render inertia: props, meta:
    end

    def show
      article = Article.find(params[:id])
      props = AdminSite::Articles::ShowPropsGenerator.call(article:)
      meta = AdminSite::Articles::ShowMetaGenerator.call
      render inertia: props, meta:
    end
  end
end
