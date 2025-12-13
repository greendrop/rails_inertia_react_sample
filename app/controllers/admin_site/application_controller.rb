# frozen_string_literal: true

module AdminSite
  class ApplicationController < ApplicationController
    PAGE_PARAM_NAME = :page
    PER_PAGE_PARAM_NAME = :per
    PER_PAGE = 20

    private_constant :PER_PAGE

    layout 'admin_site/layouts/application'

    inertia_share flash: -> { flash.to_hash }
    inertia_share sidebar: -> { AdminSite::SidebarPropsGenerator.call }

    private

    def page_param_name
      PAGE_PARAM_NAME
    end

    def per_page_param_name
      PER_PAGE_PARAM_NAME
    end

    def page
      params[page_param_name]
    end

    def per_page
      params[per_page_param_name] || PER_PAGE
    end

    def props_generator_pagination_args_by_kaminari(object)
      {
        current_path: request.path,
        current_query_parameters: request.query_parameters,
        page_param_name:,
        per_page_param_name:,
        limit_value: object.limit_value,
        total_pages: object.total_pages,
        total_count: object.total_count,
        current_page: object.current_page,
        next_page: object.next_page,
        prev_page: object.prev_page,
        first_page?: object.first_page?,
        last_page?: object.last_page?,
        out_of_range?: object.out_of_range?
      }
    end
  end
end
