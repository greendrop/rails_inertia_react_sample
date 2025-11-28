# frozen_string_literal: true

module AdminSite
  class HomesController < AdminSite::ApplicationController
    def show
      render inertia: 'AdminSite/Homes/Show'
    end
  end
end
