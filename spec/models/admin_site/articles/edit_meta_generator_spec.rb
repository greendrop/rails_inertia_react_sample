# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AdminSite::Articles::EditMetaGenerator do
  describe '#call' do
    subject(:meta) { described_class.new.call }

    it '記事編集ページのメタ情報を返す' do
      expected = [
        { title: '記事編集 | Rails Inertia React Sample - Admin Site' }
      ]
      expect(meta).to eq(expected)
    end
  end
end
