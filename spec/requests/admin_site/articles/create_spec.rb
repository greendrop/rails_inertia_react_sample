# frozen_string_literal: true

require 'rails_helper'
require 'cgi'

RSpec.describe 'AdminSite::Articles create' do
  describe 'POST /admin/articles', :inertia do
    let!(:valid_params) do
      {
        article: {
          title: '新しい記事',
          body: '本文',
          status: 'draft',
          published_at: ''
        }
      }
    end

    it '有効なパラメータなら記事を作成して一覧へリダイレクトする' do
      expect { post '/admin/articles', params: valid_params }.to change(Article, :count).by(1)
      expect(response).to redirect_to("/admin/articles/#{Article.last.id}")
      expect(flash[:notice]).to eq('記事が作成されました。')
    end

    it '無効なパラメータなら422とエラー情報を返す' do
      invalid_params = valid_params.deep_dup
      invalid_params[:article][:title] = ''

      expect { post '/admin/articles', params: invalid_params }.not_to change(Article, :count)

      expect(response).to have_http_status(:unprocessable_content)

      expect(inertia).to render_component('admin_site/articles/new')
      expect(inertia.props[:errors]).to eq({ title: ['タイトルを入力してください'] })
      expect(inertia.props[:form]).to eq(
        {
          title: '',
          body: '本文',
          status: 'draft',
          publishedAt: ''
        }
      )
    end
  end
end
