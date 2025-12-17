# frozen_string_literal: true

module AdminSite
  module Articles
    class IndexPropsGenerator
      include Callable
      include Rails.application.routes.url_helpers

      def initialize(articles:, pagination:)
        @articles = articles
        @pagination = pagination
      end

      def call
        {
          headTitle: prop_head_title,
          pageHeaderTitle: prop_page_header_title,
          articles: prop_articles,
          articleFieldNames: prop_article_field_names,
          pagination: prop_pagination,
          noDataLabel: prop_no_data_label,
          showLinkLabel: prop_show_link_label
        }
      end

      private

      attr_reader :articles, :pagination

      def prop_head_title
        '記事一覧 | Admin Site'
      end

      def prop_page_header_title
        '記事一覧'
      end

      def prop_articles
        articles.map do |article|
          {
            id: article.id,
            title: article.title,
            status: article.status,
            createdAt: article.created_at,
            updatedAt: article.updated_at,
            showLinkHref: admin_site_article_path(id: article.id)
          }
        end
      end

      def prop_article_field_names
        {
          id: 'ID',
          title: 'タイトル',
          status: 'ステータス',
          createdAt: '作成日時',
          updatedAt: '更新日時'
        }
      end

      def prop_pagination
        {
          currentPath: pagination[:current_path],
          currentQueryParameters: pagination[:current_query_parameters],
          pageParameterName: pagination[:page_param_name],
          perPageParameterName: pagination[:per_page_param_name],
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

      def prop_no_data_label
        'データがありません。'
      end

      def prop_show_link_label
        '詳細'
      end
    end
  end
end
