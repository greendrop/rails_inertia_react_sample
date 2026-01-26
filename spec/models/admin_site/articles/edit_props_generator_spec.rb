# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AdminSite::Articles::EditPropsGenerator do
  include Rails.application.routes.url_helpers

  describe '#call' do
    subject(:props) { described_class.new(article:).call }

    context 'articleが有効な場合' do
      let(:article) do
        create(
          :article,
          title: 'タイトル',
          body: '本文',
          status: :published,
          published_at: Time.zone.parse('2025-12-21T12:00')
        )
      end

      it '記事編集フォームのpropsを返す' do
        expect(props).to eq(
          pageHeaderTitle: '記事編集',
          breadcrumb: {
            items: [
              { key: 'homes#show', label: 'ホーム', href: '/admin', isActive: false },
              { key: 'articles#index', label: '記事一覧', href: '/admin/articles', isActive: false },
              { key: 'articles#edit', label: '記事編集', href: "/admin/articles/#{article.id}/edit", isActive: true }
            ]
          },
          formAction: "/admin/articles/#{article.id}",
          form: {
            title: 'タイトル',
            body: '本文',
            status: 'published',
            publishedAt: '2025-12-21T12:00'
          },
          formFieldNames: {
            title: 'タイトル',
            body: '本文',
            status: 'ステータス',
            publishedAt: '公開日時'
          },
          statusOptions: [
            { label: '下書き', value: 'draft' },
            { label: '公開', value: 'published' }
          ],
          submitButtonLabel: '更新',
          errors: {},
          formErrorAlertTitle: '入力内容を確認してください。',
          cancelLinkHref: "/admin/articles/#{article.id}",
          cancelButtonLabel: 'キャンセル'
        )
      end
    end

    context 'articleにエラーがある場合' do
      let(:article) do
        create(:article).tap do |record|
          record.title = ''
          record.body = ''
          record.validate
        end
      end

      it 'エラー内容が反映される' do
        expect(props[:errors]).to include(
          title: ['タイトルを入力してください'],
          body: ['本文を入力してください']
        )
      end
    end
  end
end
