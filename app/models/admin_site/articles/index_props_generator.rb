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
          pageHeaderTitle: prop_page_header_title,
          breadcrumb: prop_breadcrumb,
          articles: prop_articles,
          articleFieldNames: prop_article_field_names,
          pagination: prop_pagination,
          noDataLabel: prop_no_data_label,
          showLinkLabel: prop_show_link_label,
          newLinkLabel: prop_new_link_label,
          newLinkHref: prop_new_link_href,
          destroyButtonLabel: prop_destroy_button_label,
          destroyConfirmMessage: prop_destroy_confirm_message
        }
      end

      private

      attr_reader :articles, :pagination

      def prop_page_header_title
        I18n.t('admin_site.general.resource_index_title', resource: Article.model_name.human)
      end

      def prop_breadcrumb
        {
          items: [
            { key: 'homes#show',
              label: I18n.t('admin_site.general.home'),
              href: admin_site_root_path,
              isActive: false },
            { key: 'articles#index',
              label: I18n.t('admin_site.general.resource_index_title', resource: Article.model_name.human),
              href: admin_site_articles_path,
              isActive: true }
          ]
        }
      end

      def prop_articles
        articles.map do |article|
          {
            id: article.id,
            title: article.title,
            status: article.status,
            createdAt: article.created_at,
            updatedAt: article.updated_at,
            showLinkHref: admin_site_article_path(id: article.id),
            destroyLinkHref: admin_site_article_path(id: article.id)
          }
        end
      end

      def prop_article_field_names
        {
          id: Article.human_attribute_name(:id),
          title: Article.human_attribute_name(:title),
          status: Article.human_attribute_name(:status),
          createdAt: Article.human_attribute_name(:created_at),
          updatedAt: Article.human_attribute_name(:updated_at),
          operations: I18n.t('admin_site.general.operations')
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
          nextPageLabel: I18n.t('admin_site.pagination.next'),
          prevPageLabel: I18n.t('admin_site.pagination.previous'),
          nextPageAriaLabel: I18n.t('admin_site.pagination.next_aria_label'),
          prevPageAriaLabel: I18n.t('admin_site.pagination.previous_aria_label')
        }
      end

      def prop_no_data_label
        I18n.t('admin_site.general.no_data_message')
      end

      def prop_show_link_label
        I18n.t('admin_site.general.show')
      end

      def prop_new_link_label
        I18n.t('admin_site.general.new')
      end

      def prop_new_link_href
        new_admin_site_article_path
      end

      def prop_destroy_button_label
        I18n.t('admin_site.general.destroy')
      end

      def prop_destroy_confirm_message
        I18n.t('admin_site.general.resource_destroy_confirm_message', resource: Article.model_name.human)
      end
    end
  end
end
