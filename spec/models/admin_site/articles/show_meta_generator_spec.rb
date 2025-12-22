# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AdminSite::Articles::ShowMetaGenerator do
  describe '#call' do
    subject(:meta) { described_class.new.call }

    it '正しいメタ情報を返すこと' do
      expected = [
        { title: '記事詳細 | Rails Inertia React Sample - Admin Site' }
      ]

      expect(meta).to eq expected
    end
  end
end
