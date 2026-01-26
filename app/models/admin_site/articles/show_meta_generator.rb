# frozen_string_literal: true

module AdminSite
  module Articles
    class ShowMetaGenerator
      include Callable

      def call
        [
          { title:
          "#{
            I18n.t('admin_site.general.resource_show_title', resource: Article.model_name.human)
          } | Rails Inertia React Sample - Admin Site" }
        ]
      end
    end
  end
end
