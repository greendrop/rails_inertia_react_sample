# frozen_string_literal: true

module UserSite
  module Articles
    class IndexPropsGenerator
      include Callable
      include Rails.application.routes.url_helpers
      include ActionView::Helpers::TextHelper

      def initialize(articles:)
        @articles = articles
      end

      def call
        {
          pageHeaderTitle: prop_page_header_title,
          articles: prop_articles,
          noDataLabel: prop_no_data_label,
          readMoreLabel: prop_read_more_label
        }
      end

      private

      attr_reader :articles

      def prop_page_header_title
        I18n.t('user_site.general.resource_index_title', resource: Article.model_name.human)
      end

      def prop_articles
        articles.map do |article|
          {
            id: article.id,
            title: article.title,
            body: truncate(article.body),
            showLinkHref: user_site_article_path(id: article.id)
          }
        end
      end

      def prop_no_data_label
        I18n.t('user_site.general.no_data_message')
      end

      def prop_read_more_label
        I18n.t('user_site.general.read_more')
      end
    end
  end
end
