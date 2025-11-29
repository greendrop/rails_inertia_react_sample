# frozen_string_literal: true

module UserSite
  class ApplicationController < ApplicationController
    layout 'user_site/layouts/application'

    inertia_share flash: -> { flash.to_hash }
  end
end
