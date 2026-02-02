# frozen_string_literal: true

module UserSite
  module Articles
    class ShowMetaGenerator
      include Callable

      def call
        [
          { title:
          "#{
            I18n.t('user_site.general.resource_show_title', resource: Article.model_name.human)
          } | Rails Inertia React Sample" }
        ]
      end
    end
  end
end
