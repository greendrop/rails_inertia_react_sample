# frozen_string_literal: true

require 'capybara/rspec'
require 'capybara-playwright-driver'

module PlaywrightHelper
  def playwright_driver_options
    { headless: true, browser_type: :chromium }
  end
end

RSpec.configure do |config|
  config.include PlaywrightHelper, type: :system

  config.before(:suite) do
    if ENV['CI'].blank?
      # NOTE: playwrightでブラウザがインストールされているか確認し、インストールされていない場合はインストールする
      dry_run_result = ''
      IO.popen(['npx', 'playwright', 'install', '--dry-run', 'chromium'], err: %i[child out]) do |io|
        dry_run_result = io.read
      end
      matched = dry_run_result.match(/Install location:\s*(.*)\s*$/)
      install_location = matched[1] if matched

      system('npx playwright install --with-deps chromium') if install_location.nil? || !Dir.exist?(install_location)
    else
      # CI環境の場合は強制的にインストールする
      system('npx playwright install --with-deps chromium')
    end
  end

  config.before(:each, type: :system) do
    driven_by :rack_test
  end

  config.before(:each, :js, type: :system) do
    driven_by(:playwright, options: playwright_driver_options)
    Capybara.default_max_wait_time = 15
  end
end
