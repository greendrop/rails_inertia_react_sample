# frozen_string_literal: true

module AdminSite
  class SidebarPropsGenerator
    include Callable
    include Rails.application.routes.url_helpers

    def call
      {
        contentItems: generate_content_items
      }
    end

    private

    def generate_content_items
      [
        {
          title: 'ホーム',
          url: admin_site_root_path
        },
        {
          title: '記事',
          url: '#',
          children: [
            {
              title: '記事一覧',
              url: admin_site_articles_path
            }
          ]
        }
      ]
    end
  end
end
