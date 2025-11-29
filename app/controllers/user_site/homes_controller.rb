# frozen_string_literal: true

module UserSite
  class HomesController < ApplicationController
    def show
      render inertia: {}
    end
  end
end
