# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'AdminSite::Articles#destroy', :js do
  let!(:article) { create(:article, title: '削除対象の記事') }

  context '記事詳細画面から記事を削除する場合' do
    it '記事が削除されること' do
      visit "/admin/articles/#{article.id}"

      within 'main' do
        accept_confirm('記事を削除しますか？') do
          click_button '削除'
        end
      end

      expect(page).to have_current_path(admin_site_articles_path, ignore_query: true)

      within 'main' do
        expect(page).to have_content('記事が削除されました。')
        expect(page).to have_content('記事一覧')
        expect(page).to have_content('データがありません。')
        expect(page).to have_no_content('削除対象の記事')
      end
    end
  end

  context '記事一覧画面から記事を削除する場合' do
    it '記事が削除されること' do
      visit admin_site_articles_path

      within 'main' do
        accept_confirm('記事を削除しますか？') do
          click_button '削除'
        end
      end

      expect(page).to have_current_path(admin_site_articles_path, ignore_query: true)

      within 'main' do
        expect(page).to have_content('記事が削除されました。')
        expect(page).to have_content('記事一覧')
        expect(page).to have_content('データがありません。')
        expect(page).to have_no_content('削除対象の記事')
      end
    end
  end
end
