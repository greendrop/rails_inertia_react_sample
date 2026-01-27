# frozen_string_literal: true

module AdminSite
  class HomesController < AdminSite::ApplicationController
    def show
      props = AdminSite::Homes::ShowPropsGenerator.call
      meta = AdminSite::Homes::ShowMetaGenerator.call
      render inertia: props, meta:
    end
  end
end
