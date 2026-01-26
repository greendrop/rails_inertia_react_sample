# frozen_string_literal: true

module AdminSite
  module Articles
    class EditPropsGenerator
      include Callable
      include Rails.application.routes.url_helpers

      def initialize(article:)
        @article = article
      end

      def call
        {
          pageHeaderTitle: prop_page_header_title,
          breadcrumb: prop_breadcrumb,
          formAction: prop_form_action,
          form: prop_form,
          formFieldNames: prop_form_field_names,
          statusOptions: prop_status_options,
          submitButtonLabel: prop_submit_button_label,
          errors: prop_errors,
          formErrorAlertTitle: prop_form_error_alert_title
        }
      end

      private

      attr_reader :article

      def prop_page_header_title
        I18n.t('admin_site.general.resource_edit_title', resource: Article.model_name.human)
      end

      def prop_breadcrumb
        {
          items: [
            { key: 'homes#show', label: 'ホーム', href: admin_site_root_path, isActive: false },
            { key: 'articles#index', label: '記事一覧', href: admin_site_articles_path, isActive: false },
            { key: 'articles#show', label: '記事詳細', href: admin_site_article_path(id: article.id), isActive: false },
            {
              key: 'articles#edit',
              label: I18n.t('admin_site.general.resource_edit_title', resource: Article.model_name.human),
              href: edit_admin_site_article_path(id: article.id),
              isActive: true
            }
          ]
        }
      end

      def prop_form_action
        admin_site_article_path(id: article.id)
      end

      def prop_form
        {
          title: article.title.to_s,
          body: article.body.to_s,
          status: article.status || Article.statuses.keys.first,
          publishedAt: formatted_datetime(article.published_at)
        }
      end

      def prop_form_field_names
        {
          title: Article.human_attribute_name('title'),
          body: Article.human_attribute_name('body'),
          status: Article.human_attribute_name('status'),
          publishedAt: Article.human_attribute_name('published_at')
        }
      end

      def prop_status_options
        Article.status_options.map do |label, value|
          { label:, value: }
        end
      end

      def prop_submit_button_label
        I18n.t('admin_site.general.update')
      end

      def prop_errors
        return {} if article.errors.blank?

        article.errors.each_with_object({}) do |error, hash|
          hash[error.attribute] = article.errors.full_messages_for(error.attribute)
        end
      end

      def prop_form_error_alert_title
        I18n.t('admin_site.general.form_error_alert_title')
      end

      def formatted_datetime(value)
        return '' if value.blank?
        return value if value.is_a?(String)

        value.respond_to?(:in_time_zone) ? value.in_time_zone.strftime('%Y-%m-%dT%H:%M') : value.to_s
      end
    end
  end
end
