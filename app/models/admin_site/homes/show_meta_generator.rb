# frozen_string_literal: true

module AdminSite
  module Homes
    class ShowMetaGenerator
      include Callable

      def call
        [
          { title:
          "#{
            I18n.t('admin_site.general.home')
          } | Rails Inertia React Sample - Admin Site" }
        ]
      end
    end
  end
end
