# frozen_string_literal: true

module AdminSite
  module Articles
    class ShowMetaGenerator
      include Callable

      def call
        [
          { title: '記事詳細 | Rails Inertia React Sample - Admin Site' }
        ]
      end
    end
  end
end
