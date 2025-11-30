# frozen_string_literal: true

class Article < ApplicationRecord
  enum :status, { draft: 0, published: 1 }

  validates :title, presence: true, length: { maximum: 255 }
  validates :body, presence: true
end
