# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AdminSite::Articles::NewPropsGenerator do
  include Rails.application.routes.url_helpers

  describe '#call' do
    context 'articleが指定なしの場合' do
      subject(:props) { described_class.new.call }

      it '記事作成フォームの初期propsを返す' do
        expect(props).to eq(
          pageHeaderTitle: '記事作成',
          breadcrumb: {
            items: [
              { key: 'homes#show', label: 'ホーム', href: '/admin', isActive: false },
              { key: 'articles#new', label: '記事作成', href: '/admin/articles/new', isActive: true }
            ]
          },
          formAction: '/admin/articles',
          form: {
            title: '',
            body: '',
            status: 'draft',
            publishedAt: ''
          },
          formFieldNames: {
            title: 'タイトル',
            body: '本文',
            status: 'ステータス',
            publishedAt: '公開日時'
          },
          errors: {},
          statusOptions: [
            { label: '下書き', value: 'draft' },
            { label: '公開', value: 'published' }
          ],
          submitButtonLabel: '作成',
          formErrorAlertTitle: '入力内容を確認してください。'
        )
      end
    end

    context 'articleが指定されている場合' do
      subject(:props) { described_class.new(article:).call }

      let!(:article) do
        build(:article, title: 'タイトル', body: '本文', status: 'published', published_at: '2025-12-21T12:00')
      end

      it '指定値が反映される' do
        expect(props[:form]).to eq(
          title: 'タイトル',
          body: '本文',
          status: 'published',
          publishedAt: '2025-12-21T12:00'
        )
      end
    end

    context 'articleにエラーがある場合' do
      subject(:props) { described_class.new(article:).call }

      let!(:article) do
        build(:article, title: '', body: '').tap(&:validate)
      end

      it 'エラー内容が反映される' do
        expect(props[:errors]).to eq(
          title: ['タイトルを入力してください'],
          body: ['本文を入力してください']
        )
      end
    end
  end
end
