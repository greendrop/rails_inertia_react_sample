# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'UserSite::Articles#index', :js do
  context '公開記事が存在する場合' do
    let!(:published_article) { create(:article, :published, title: '公開記事', body: '公開本文です') }
    let!(:draft_article) { create(:article, :draft, title: '下書き記事') }

    it '公開記事のみが表示されること' do
      visit user_site_articles_path

      within 'main' do
        expect(page).to have_content('記事一覧')
        expect(page).to have_content('公開記事')
        expect(page).to have_content('公開本文です')
        expect(page).to have_link('続きを読む', href: user_site_article_path(published_article))
        expect(page).to have_no_content('下書き記事')
      end
    end
  end

  context '公開記事が存在しない場合' do
    let!(:draft_article) { create(:article, :draft, title: '下書き記事') }

    it 'データなしメッセージが表示されること' do
      visit user_site_articles_path

      within 'main' do
        expect(page).to have_content('記事一覧')
        expect(page).to have_content('データがありません。')
        expect(page).to have_no_link('続きを読む')
        expect(page).to have_no_content('下書き記事')
      end
    end
  end
end
