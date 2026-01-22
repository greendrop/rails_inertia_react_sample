# frozen_string_literal: true

class Article < ApplicationRecord
  enum :status, { draft: 0, published: 1 }

  validates :title, presence: true, length: { maximum: 255 }
  validates :body, presence: true
  validates :status, presence: true

  class << self
    def status_i18n(status)
      I18n.t("enums.#{model_name.i18n_key}.status.#{status}")
    end

    def status_options
      statuses.map { |key, _| [status_i18n(key), key] }
    end
  end

  def status_i18n
    self.class.status_i18n(status)
  end
end
