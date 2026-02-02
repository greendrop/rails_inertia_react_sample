# frozen_string_literal: true

module UserSite
  module Articles
    class ShowPropsGenerator
      include Callable

      def initialize(article:)
        @article = article
      end

      def call
        {
          pageHeaderTitle: prop_page_header_title,
          article: prop_article
        }
      end

      private

      attr_reader :article

      def prop_page_header_title
        I18n.t('user_site.general.resource_show_title', resource: Article.model_name.human)
      end

      def prop_article
        {
          id: article.id,
          title: article.title,
          body: article.body
        }
      end
    end
  end
end
