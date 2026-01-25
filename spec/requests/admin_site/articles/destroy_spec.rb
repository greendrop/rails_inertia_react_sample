# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'AdminSite::Articles destroy' do
  describe 'DELETE /admin/articles/:id' do
    let!(:article) { create(:article) }

    context '記事の削除に成功する場合' do
      it '記事を削除して一覧へリダイレクトする' do
        expect do
          delete "/admin/articles/#{article.id}"
        end.to change(Article, :count).by(-1)

        expect(response).to have_http_status(:see_other)
        expect(response).to redirect_to('/admin/articles')
        expect(flash[:notice]).to eq('記事が削除されました。')
      end
    end

    context '記事の削除に失敗した場合' do
      before do
        allow(Article).to receive(:find).with(article.id.to_s).and_return(article)
        allow(article).to receive(:destroy).and_return(false)
      end

      it '記事の削除に失敗し、一覧へリダイレクトする' do
        delete "/admin/articles/#{article.id}"
        expect(response).to have_http_status(:see_other)
        expect(flash[:alert]).to eq('記事の削除に失敗しました。')
      end
    end

    context '記事が存在しない場合' do
      it '404を返す' do
        delete "/admin/articles/#{article.id + 999_999}"

        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
