# frozen_string_literal: true

module AdminSite
  class ArticlesController < AdminSite::ApplicationController
    before_action :set_article, only: %i[show destroy]

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
        redirect_to admin_site_article_path(id: article.to_param)
      else
        props = AdminSite::Articles::NewPropsGenerator.call(article:)
        meta = AdminSite::Articles::NewMetaGenerator.call
        render inertia: 'admin_site/articles/new', props:, meta:, status: :unprocessable_content
      end
    end

    def destroy
      if article.destroy
        flash[:notice] =
          I18n.t('admin_site.general.resource_destroyed_message', resource: Article.model_name.human)
      else
        flash[:alert] =
          I18n.t('admin_site.general.resource_destroy_failed_message', resource: Article.model_name.human)
      end

      redirect_to admin_site_articles_path, status: :see_other
    end

    private

    attr_reader :article

    def set_article
      @article = Article.find(params[:id])
    end

    def article_params
      params.expect(article: %i[title body status published_at])
    end
  end
end
