# frozen_string_literal: true

module AdminSite
  module Articles
    class IndexPropsGenerator
      def initialize(articles:)
        @articles = articles
      end

      def generate
        {
          articles: generate_articles,
          article_column_names: generate_article_column_names
        }
      end

      private

      attr_reader :articles

      def generate_articles
        articles.as_json(only: %i[id title status created_at updated_at])
      end

      def generate_article_column_names
        {
          id: 'ID',
          title: 'タイトル',
          status: 'ステータス',
          created_at: '作成日時',
          updated_at: '更新日時'
        }
      end
    end
  end
end
