# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UserSite::Articles::ShowPropsGenerator do
  describe '#call' do
    subject { described_class.new(article:).call }

    let!(:article) do
      create(:article, :published, title: 'タイトル', body: '本文')
    end

    it '記事詳細で使用するpropsを返す' do
      response = subject
      expected = {
        pageHeaderTitle: '記事詳細',
        article: {
          id: article.id,
          title: article.title,
          body: article.body
        }
      }

      expect(response).to eq(expected)
    end
  end
end
