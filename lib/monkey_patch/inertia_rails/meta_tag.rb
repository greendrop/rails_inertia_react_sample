# frozen_string_literal: true

module MonkeyPatch
  module InertiaRails
    module MetaTag
      def to_tag(tag_helper, use_data_inertia_head_attribute: false) # rubocop:disable Metrics/PerceivedComplexity
        data =
          if use_data_inertia_head_attribute
            @tag_data.merge(type: @tag_type, data: { inertia: @head_key })
          else
            @tag_data.merge(type: @tag_type, inertia: @head_key)
          end

        inner_content =
          if @tag_name == :script
            tag_script_inner_content(data.delete(:inner_content))
          else
            data.delete(:inner_content)
          end

        if ::InertiaRails::MetaTag::UNARY_TAGS.include? @tag_name
          tag_helper.public_send(@tag_name, **data.transform_keys { |k| k.to_s.tr('_', '-').to_sym })
        else
          tag_helper.public_send(@tag_name, inner_content, **data.transform_keys { |k| k.to_s.tr('_', '-').to_sym })
        end
      end
    end
  end
end

InertiaRails::MetaTag.prepend(MonkeyPatch::InertiaRails::MetaTag)
