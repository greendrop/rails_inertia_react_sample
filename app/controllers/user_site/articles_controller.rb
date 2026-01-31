# frozen_string_literal: true

module UserSite
  class ArticlesController < UserSite::ApplicationController
    DEFAULT_PAGE_TITLE = '記事一覧'
    EMPTY_STATE_MESSAGE = '表示できる記事がありません'
    BODY_PREVIEW_LENGTH = 120

    def index
      render inertia: {
        page_title: DEFAULT_PAGE_TITLE,
        empty_message: EMPTY_STATE_MESSAGE,
        articles: serialized_articles
      }
    end

    def show
      article = published_articles.find(params[:id])

      render inertia: {
        page_title: article.title,
        index_url: user_site_articles_path,
        article: serialize_full_article(article)
      }
    end

    private

    def serialized_articles
      published_articles.map { |article| serialize_article_summary(article) }
    end

    def serialize_article_summary(article)
      {
        id: article.id,
        title: article.title,
        body_preview: article.body.to_s.truncate(BODY_PREVIEW_LENGTH),
        published_at: article.published_at&.iso8601,
        detail_url: user_site_article_path(article)
      }
    end

    def serialize_full_article(article)
      {
        id: article.id,
        title: article.title,
        body: article.body,
        published_at: article.published_at&.iso8601
      }
    end

    def published_articles
      @_published_articles ||= Article.published.order(published_at: :desc, created_at: :desc)
    end
  end
end
