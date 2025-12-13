# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'AdminSite::Articles#index', :js do
  context '記事が存在する場合' do
    let!(:article1) { create(:article, title: 'First Article') }
    let!(:article2) { create(:article, title: 'Second Article') }

    before do
      visit admin_site_articles_path
    end

    it '記事一覧が表示されること' do
      within 'main' do
        expect(page).to have_content('First Article')
        expect(page).to have_content('Second Article')
        expect(page).to have_css('nav[role="navigation"]')
      end
    end
  end
end
