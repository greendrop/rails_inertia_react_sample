# frozen_string_literal: true

module MonkeyPatch
  module InertiaRails
    module Helper
      def inertia_meta_tags(use_data_inertia_head_attribute: false)
        meta_tag_data = (inertia_page || {}).dig(:props, :_inertia_meta) || []

        meta_tags = meta_tag_data.map do |inertia_meta_tag|
          inertia_meta_tag.to_tag(tag, use_data_inertia_head_attribute:)
        end

        safe_join(meta_tags, "\n")
      end
    end
  end
end

InertiaRails::Helper.prepend(MonkeyPatch::InertiaRails::Helper)
