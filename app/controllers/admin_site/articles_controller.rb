# frozen_string_literal: true

module AdminSite
  class ArticlesController < ApplicationController
    def index
      articles = Article.order(id: :asc).page(page).per(per_page)

      props = AdminSite::Articles::IndexPropsGenerator.call(
        articles:,
        pagination: props_generator_pagination_args_by_kaminari(articles)
      )
      render inertia: props
    end
  end
end
