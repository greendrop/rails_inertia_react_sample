# frozen_string_literal: true

require 'rails_helper'
require 'cgi'

RSpec.describe 'AdminSite::Articles create' do
  describe 'POST /admin/articles' do
    let(:valid_params) do
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
      expect(response).to redirect_to('/admin/articles')
      expect(flash[:notice]).to eq('記事が作成されました。')
    end

    it '無効なパラメータなら422とエラー情報を返す' do
      invalid_params = valid_params.deep_dup
      invalid_params[:article][:title] = ''

      expect { post '/admin/articles', params: invalid_params }.not_to change(Article, :count)
      expect(response).to have_http_status(:unprocessable_content)

      match = response.body.match(/data-page="([^"]+)"/)
      expect(match).not_to be_nil

      page_json = CGI.unescapeHTML(match[1])
      json = JSON.parse(page_json)

      expect(json['component']).to eq('admin_site/articles/new')
      expect(json['props']['errors']).to include('title' => include('タイトルを入力してください'))
      expect(json['props']['form']).to include('body' => '本文')
    end
  end
end
