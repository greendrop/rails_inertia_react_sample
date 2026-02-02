# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'UserSite::Articles#show', :js do
  let!(:article) { create(:article, :published, title: 'Show Article', body: 'This is the article body.') }

  it '記事詳細が表示されること' do
    visit user_site_article_path(article)

    within 'main' do
      expect(page).to have_content('記事詳細')
      expect(page).to have_content('Show Article')
      expect(page).to have_content('This is the article body.')
    end
  end
end
