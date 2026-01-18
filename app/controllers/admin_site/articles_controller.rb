# frozen_string_literal: true

module AdminSite
  class ArticlesController < AdminSite::ApplicationController
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

    def new
      props = AdminSite::Articles::NewPropsGenerator.call
      meta = AdminSite::Articles::NewMetaGenerator.call
      render inertia: props, meta:
    end

    def create
      article = Article.new(article_params)

      if article.save
        flash[:notice] = I18n.t('admin_site.general.resource_created_message', resource: Article.model_name.human)
        redirect_to admin_site_articles_path
      else
        props = AdminSite::Articles::NewPropsGenerator.call(article:)
        meta = AdminSite::Articles::NewMetaGenerator.call
        render inertia: 'admin_site/articles/new', props:, meta:, status: :unprocessable_content
      end
    end

    private

    def article_params
      params.expect(article: %i[title body status published_at])
    end
  end
end
