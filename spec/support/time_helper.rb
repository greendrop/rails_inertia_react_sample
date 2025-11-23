# frozen_string_literal: true

RSpec.configure do |config|
  require 'active_support/testing/time_helpers'
  config.include ActiveSupport::Testing::TimeHelpers
end
