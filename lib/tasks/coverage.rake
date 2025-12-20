# frozen_string_literal: true

namespace :coverage do
  task collate: :environment do
    require 'simplecov'
    SimpleCov.coverage_dir 'coverage/rspec'
    SimpleCov.collate Dir['coverage/rspec/.resultset*.json'], 'rails'
  end
end
