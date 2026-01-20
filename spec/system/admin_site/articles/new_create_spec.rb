# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'AdminSite::Articles#new,create', :js do
  it '記事が作成できること' do
    visit '/admin/articles/new'

    within 'main' do
      expect(page).to have_content('記事作成')

      fill_in 'タイトル', with: 'New Article Title'
      fill_in '本文', with: 'This is the body of the new article.'
      select '公開', from: 'ステータス'
      fill_in '公開日時', with: '2024-07-01T10:00'

      click_button '作成'
    end

    expect(page).to have_current_path("/admin/articles/#{Article.last.id}")

    within 'main' do
      expect(page).to have_content('記事が作成されました。')
      expect(page).to have_content('New Article Title')
    end
  end
end
