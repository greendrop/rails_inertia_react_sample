# frozen_string_literal: true

namespace :coverage do
  task collate: :environment do
    require 'simplecov'
    SimpleCov.collate Dir['coverage/.resultset*.json'], 'rails'
  end
end
