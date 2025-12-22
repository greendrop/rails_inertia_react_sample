# frozen_string_literal: true

Rails.root.glob('lib/monkey_patch/**/*.rb').sort.each do |file|
  require file
end
