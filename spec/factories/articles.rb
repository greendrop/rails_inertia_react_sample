# frozen_string_literal: true

FactoryBot.define do
  factory :article do
    sequence(:title) { |n| "Title #{n}" }
    sequence(:body) { |n| "Body content for article #{n}" }
    status { %i[draft published].sample }
    published_at { Time.current }

    trait :draft do
      status { :draft }
      published_at { nil }
    end

    trait :published do
      status { :published }
      published_at { Time.current }
    end
  end
end
