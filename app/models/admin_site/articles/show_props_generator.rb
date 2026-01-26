# frozen_string_literal: true

module AdminSite
  module Articles
    class ShowPropsGenerator
      include Callable
      include Rails.application.routes.url_helpers

      def initialize(article:)
        @article = article
      end

      def call
        {
          pageHeaderTitle: prop_page_header_title,
          breadcrumb: prop_breadcrumb,
          article: prop_article,
          articleFieldNames: prop_article_field_names,
          editButtonLabel: prop_edit_button_label,
          editLinkHref: prop_edit_link_href,
          destroyButtonLabel: prop_destroy_button_label,
          destroyConfirmMessage: prop_destroy_confirm_message,
          destroyLinkHref: prop_destroy_link_href
        }
      end

      private

      attr_reader :article

      def prop_page_header_title
        '記事詳細'
      end

      def prop_breadcrumb
        {
          items: [
            { key: 'homes#show', label: 'ホーム', href: admin_site_root_path, isActive: false },
            { key: 'articles#index', label: '記事一覧', href: admin_site_articles_path, isActive: false },
            { key: 'articles#show', label: '記事詳細', href: admin_site_article_path(id: article.id), isActive: true }
          ]
        }
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

      def prop_edit_button_label
        I18n.t('admin_site.general.edit')
      end

      def prop_edit_link_href
        edit_admin_site_article_path(id: article.id)
      end

      def prop_destroy_button_label
        I18n.t('admin_site.general.destroy')
      end

      def prop_destroy_confirm_message
        I18n.t('admin_site.general.resource_destroy_confirm_message', resource: Article.model_name.human)
      end

      def prop_destroy_link_href
        admin_site_article_path(id: article.id)
      end
    end
  end
end
