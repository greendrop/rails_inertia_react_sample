# frozen_string_literal: true

module AdminSite
  class ArticlesController < ApplicationController
    def index
      articles = Article.order(created_at: :desc).limit(50)
      render inertia: { articles: articles.as_json(only: %i[id title status created_at updated_at]) }
    end
  end
end
