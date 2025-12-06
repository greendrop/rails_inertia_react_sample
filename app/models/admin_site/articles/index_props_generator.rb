# frozen_string_literal: true

module AdminSite
  module Articles
    class IndexPropsGenerator
      include Callable

      def initialize(articles:)
        @articles = articles
      end

      def call
        {
          articles: generate_articles,
          articleColumnNames: generate_article_column_names
        }
      end

      private

      attr_reader :articles

      def generate_articles
        articles.map do |article|
          {
            id: article.id,
            title: article.title,
            status: article.status,
            createdAt: article.created_at,
            updatedAt: article.updated_at
          }
        end
      end

      def generate_article_column_names
        {
          id: 'ID',
          title: 'タイトル',
          status: 'ステータス',
          createdAt: '作成日時',
          updatedAt: '更新日時'
        }
      end
    end
  end
end
