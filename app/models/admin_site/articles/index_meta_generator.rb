# frozen_string_literal: true

module AdminSite
  module Articles
    class IndexMetaGenerator
      include Callable

      def call
        [
          { title: '記事一覧 | Rails Inertia React Sample - Admin Site' }
        ]
      end
    end
  end
end
