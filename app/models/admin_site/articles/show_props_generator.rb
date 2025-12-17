# frozen_string_literal: true

module AdminSite
  module Articles
    class ShowPropsGenerator
      include Callable

      def initialize(article:)
        @article = article
      end

      def call
        {
          headTitle: generate_head_title,
          pageHeaderTitle: generate_page_header_title,
          article: generate_article,
          articleFieldNames: generate_article_field_names
        }
      end

      private

      attr_reader :article

      def generate_head_title
        '記事詳細 | Admin Site'
      end

      def generate_page_header_title
        '記事詳細'
      end

      def generate_article
        {
          id: article.id,
          title: article.title,
          status: article.status,
          body: article.body,
          createdAt: article.created_at,
          updatedAt: article.updated_at
        }
      end

      def generate_article_field_names
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
