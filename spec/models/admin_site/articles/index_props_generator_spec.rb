# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AdminSite::Articles::IndexPropsGenerator do
  describe '#call' do
    subject { described_class.new(articles:).call }

    let!(:article1) { create(:article, :draft, title: 'タイトル1') }
    let!(:article2) { create(:article, :draft, title: 'タイトル2') }
    let!(:articles) { [article1, article2] }

    it '記事情報の配列とカラム名を返す' do
      expected = articles.map do |article|
        {
          id: article.id,
          title: article.title,
          status: article.status,
          createdAt: article.created_at,
          updatedAt: article.updated_at
        }
      end
      expect(subject[:articles]).to eq(expected)

      expected = {
        id: 'ID',
        title: 'タイトル',
        status: 'ステータス',
        createdAt: '作成日時',
        updatedAt: '更新日時'
      }
      expect(subject[:articleColumnNames]).to eq(expected)
    end
  end
end
