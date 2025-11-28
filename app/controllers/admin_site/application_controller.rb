# frozen_string_literal: true

module AdminSite
  class ApplicationController < ApplicationController
    layout 'admin_site/layouts/application'

    inertia_share flash: -> { flash.to_hash }
  end
end
