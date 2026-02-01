# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UserSite::Articles::IndexMetaGenerator do
  describe '#call' do
    subject(:meta) { described_class.new.call }

    it '正しいメタ情報を返すこと' do
      expected = [
        { title: '記事一覧 | Rails Inertia React Sample' }
      ]
      expect(meta).to eq expected
    end
  end
end
