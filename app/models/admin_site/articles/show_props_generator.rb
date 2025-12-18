# frozen_string_literal: true

module AdminSite
  module Articles
    class ShowPropsGenerator
      include Callable
      include ActionView::Helpers::SanitizeHelper

      def initialize(article:)
        @article = article
      end

      def call
        {
          headTitle: prop_head_title,
          pageHeaderTitle: prop_page_header_title,
          article: prop_article,
          articleFieldNames: prop_article_field_names
        }
      end

      private

      attr_reader :article

      def prop_head_title
        '記事詳細 | Admin Site'
      end

      def prop_page_header_title
        '記事詳細'
      end

      def prop_article
        {
          id: article.id,
          title: article.title,
          status: article.status,
          body: article.body,
          createdAt: article.created_at,
          updatedAt: article.updated_at
        }
      end

      def prop_article_field_names
        {
          id: 'ID',
          title: 'タイトル',
          status: 'ステータス',
          body: '本文',
          createdAt: '作成日時',
          updatedAt: '更新日時'
        }
      end
    end
  end
end
