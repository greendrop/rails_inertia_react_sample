# frozen_string_literal: true

module AdminSite
  class ArticlesController < ApplicationController
    def index
      articles = Article.order(created_at: :desc).limit(50)
      props = AdminSite::Articles::IndexPropsGenerator.new(articles:).generate

      render inertia: props
    end
  end
end
