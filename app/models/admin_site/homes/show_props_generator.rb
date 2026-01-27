# frozen_string_literal: true

module AdminSite
  module Homes
    class ShowPropsGenerator
      include Callable
      include Rails.application.routes.url_helpers

      def call
        {
          pageHeaderTitle: prop_page_header_title,
          breadcrumb: prop_breadcrumb
        }
      end

      private

      def prop_page_header_title
        I18n.t('admin_site.general.home')
      end

      def prop_breadcrumb
        {
          items: [
            { key: 'homes#show',
              label: I18n.t('admin_site.general.home'),
              href: admin_site_root_path,
              isActive: true }
          ]
        }
      end
    end
  end
end
