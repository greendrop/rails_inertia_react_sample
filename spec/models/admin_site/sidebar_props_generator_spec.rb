# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AdminSite::SidebarPropsGenerator do
  describe '#call' do
    subject(:props) { described_class.new.call }

    it 'SidebarPropsGeneratorのpropsが期待通りであること' do
      expected = {
        contentItems: [
          {
            title: 'ホーム',
            url: '/admin'
          },
          {
            title: '記事',
            url: '#',
            children: [
              {
                title: '記事一覧',
                url: '/admin/articles'
              }
            ]
          }
        ]
      }
      expect(props).to eq(expected)
    end
  end
end
