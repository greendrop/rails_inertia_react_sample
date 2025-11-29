# frozen_string_literal: true

module UserSite
  class HomesController < UserSite::ApplicationController
    def show
      render inertia: {}
    end
  end
end
