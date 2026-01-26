# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'AdminSite::Articles#edit,update', :js do
  let!(:article) do
    create(
      :article,
      title: 'Old Article Title',
      body: 'Old article body.',
      status: :draft,
      published_at: nil
    )
  end

  context '記事編集画面から更新する場合' do
    it '記事が更新されること' do
      visit admin_site_article_path(article)

      within 'main' do
        click_on '編集'
      end

      expect(page).to have_current_path(edit_admin_site_article_path(article), ignore_query: true)

      within 'main' do
        expect(page).to have_content('記事編集')

        fill_in 'タイトル', with: 'Updated Article Title'
        fill_in '本文', with: 'Updated article body.'
        select '公開', from: 'ステータス'
        fill_in '公開日時', with: 3.days.from_now.strftime('%Y-%m-%dT%H:%M')

        click_button '更新'
      end

      expect(page).to have_current_path(admin_site_article_path(article), ignore_query: true)

      within 'main' do
        expect(page).to have_content('記事が更新されました。')
        expect(page).to have_content('Updated Article Title')
        expect(page).to have_content('Updated article body.')
      end
    end
  end

  context 'バリデーションエラーがある場合' do
    it 'エラーメッセージが表示され、記事が更新されないこと' do
      visit edit_admin_site_article_path(article)

      within 'main' do
        fill_in 'タイトル', with: ''
        fill_in '本文', with: ''
        click_button '更新'
      end

      within 'main' do
        expect(page).to have_content('入力内容を確認してください。')
        expect(page).to have_content('タイトルを入力してください')
        expect(page).to have_content('本文を入力してください')
      end

      expect(article.reload.title).to eq('Old Article Title')
      expect(article.body).to eq('Old article body.')
    end
  end
end
