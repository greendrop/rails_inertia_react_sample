# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'AdminSite::Articles destroy' do
  describe 'DELETE /admin/articles/:id' do
    let!(:article) { create(:article) }

    it '記事を削除して一覧へリダイレクトする' do
      expect do
        delete "/admin/articles/#{article.id}"
      end.to change(Article, :count).by(-1)

      expect(response).to have_http_status(:see_other)
      expect(response).to redirect_to('/admin/articles')
      expect(flash[:notice]).to eq('記事を削除しました。')
    end

    it '存在しないIDでは404を返す' do
      delete "/admin/articles/#{article.id + 999_999}"

      expect(response).to have_http_status(:not_found)
    end
  end
end
