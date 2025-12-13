# frozen_string_literal: true

module AdminSite
  module Articles
    class IndexPropsGenerator
      include Callable

      def initialize(articles:, pagination:)
        @articles = articles
        @pagination = pagination
      end

      def call
        {
          articles: generate_articles,
          articleColumnNames: generate_article_column_names,
          pagination: generate_pagination
        }
      end

      private

      attr_reader :articles, :pagination

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

      def generate_pagination
        {
          currentPath: pagination[:current_path],
          currentQueryParameters: pagination[:current_query_parameters],
          pageParamatorName: pagination[:page_param_name],
          perPageParamatorName: pagination[:per_page_param_name],
          currentPage: pagination[:current_page],
          perPage: pagination[:limit_value],
          totalPages: pagination[:total_pages],
          totalCount: pagination[:total_count],
          nextPage: pagination[:next_page],
          prevPage: pagination[:prev_page],
          isFirstPage: pagination[:first_page?],
          isLastPage: pagination[:last_page?],
          isOutOfRange: pagination[:out_of_range?],
          nextPageLabel: '次へ',
          prevPageLabel: '前へ',
          nextPageAriaLabel: '次のページへ',
          prevPageAriaLabel: '前のページへ'
        }
      end
    end
  end
end
