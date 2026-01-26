import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import ArticleFormContent from "@/features/admin_site/articles/components/ArticleFormContent"
import type {
  ArticleForm,
  ArticleFormFieldNames,
  ArticleStatusOption,
} from "@/features/admin_site/articles/types"

const form: ArticleForm = {
  title: "テストタイトル",
  body: "テスト本文",
  status: "draft",
  publishedAt: "2025-01-01T00:00",
}

const formFieldNames: ArticleFormFieldNames = {
  title: "タイトル",
  body: "本文",
  status: "ステータス",
  publishedAt: "公開日時",
}

const statusOptions: ArticleStatusOption[] = [
  { label: "下書き", value: "draft" },
  { label: "公開", value: "published" },
]

const submitButtonLabel = "送信"
const formErrorAlertTitle = "入力内容を確認してください。"

describe("ArticleFormContent", () => {
  it("エラーがない場合に正しくレンダリングされる（スナップショット）", () => {
    const { container } = render(
      <ArticleFormContent
        form={form}
        formFieldNames={formFieldNames}
        statusOptions={statusOptions}
        submitButtonLabel={submitButtonLabel}
        formErrorAlertTitle={formErrorAlertTitle}
        errors={{}}
        processing={false}
      />,
    )

    expect(container).toMatchSnapshot()
  })

  it("エラーがある場合に正しくレンダリングされる（スナップショット）", () => {
    const { container } = render(
      <ArticleFormContent
        form={form}
        formFieldNames={formFieldNames}
        statusOptions={statusOptions}
        submitButtonLabel={submitButtonLabel}
        formErrorAlertTitle={formErrorAlertTitle}
        errors={{
          title: "タイトルエラー",
          body: ["本文エラー1", "本文エラー2"],
          status: "ステータスエラー",
          published_at: ["公開日時エラー"],
          base: "その他のエラー",
        }}
        processing
      />,
    )

    expect(container).toMatchSnapshot()
  })

  it("キャンセルリンクが表示される", () => {
    const { getByRole } = render(
      <ArticleFormContent
        form={form}
        formFieldNames={formFieldNames}
        statusOptions={statusOptions}
        submitButtonLabel={submitButtonLabel}
        formErrorAlertTitle={formErrorAlertTitle}
        errors={{}}
        processing={false}
        cancelLinkHref="/admin/articles/1"
        cancelLinkLabel="キャンセル"
      />,
    )

    expect(getByRole("link", { name: "キャンセル" })).toBeTruthy()
  })
})
