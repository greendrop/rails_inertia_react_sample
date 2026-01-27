# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AdminSite::Homes::ShowPropsGenerator do
  describe '#call' do
    subject(:props) { described_class.new.call }

    it '管理ホームで使用するpropsを返す' do
      expected = {
        pageHeaderTitle: 'ホーム',
        breadcrumb: {
          items: [
            { key: 'homes#show', label: 'ホーム', href: '/admin', isActive: true }
          ]
        }
      }

      expect(props).to eq(expected)
    end
  end
end
