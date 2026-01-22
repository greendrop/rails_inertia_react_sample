import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import ArticleNewForm from "@/features/admin_site/articles/new/components/ArticleNewForm"
import type {
  ArticleForm,
  ArticleFormFieldNames,
  ArticleStatusOption,
} from "@/features/admin_site/articles/types"

let mockErrors: Record<string, unknown> = {}
let mockProcessing = false

vi.mock("@inertiajs/react", () => {
  return {
    Form: ({ action, method, children }: any) => (
      <form action={action} method={method}>
        {typeof children === "function"
          ? children({ errors: mockErrors, processing: mockProcessing })
          : children}
      </form>
    ),
  }
})

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
const formAction = "/admin/articles"

describe("ArticleNewForm", () => {
  it("Form に action と method が渡される", () => {
    mockErrors = {}
    mockProcessing = false

    const { container } = render(
      <ArticleNewForm
        form={form}
        formAction={formAction}
        formFieldNames={formFieldNames}
        statusOptions={statusOptions}
        submitButtonLabel={submitButtonLabel}
        formErrorAlertTitle={formErrorAlertTitle}
      />,
    )

    const formElement = container.querySelector("form")
    expect(formElement).not.toBeNull()
    expect(formElement?.getAttribute("action")).toBe(formAction)
    expect(formElement?.getAttribute("method")).toBe("post")
  })

  it("エラーがない場合に正しくレンダリングされる（スナップショット）", () => {
    mockErrors = {}
    mockProcessing = false

    const { container } = render(
      <ArticleNewForm
        form={form}
        formAction={formAction}
        formFieldNames={formFieldNames}
        statusOptions={statusOptions}
        submitButtonLabel={submitButtonLabel}
        formErrorAlertTitle={formErrorAlertTitle}
      />,
    )

    expect(container).toMatchSnapshot()
  })

  it("エラーがある場合に正しくレンダリングされる（スナップショット）", () => {
    mockErrors = {
      title: "タイトルエラー",
      body: ["本文エラー1", "本文エラー2"],
      status: "ステータスエラー",
      published_at: ["公開日時エラー"],
      base: "その他のエラー",
    }
    mockProcessing = true

    const { container } = render(
      <ArticleNewForm
        form={form}
        formAction={formAction}
        formFieldNames={formFieldNames}
        statusOptions={statusOptions}
        submitButtonLabel={submitButtonLabel}
        formErrorAlertTitle={formErrorAlertTitle}
      />,
    )

    expect(screen.getByText(formErrorAlertTitle)).toBeTruthy()
    expect(screen.getByText("その他のエラー")).toBeTruthy()
    expect(screen.getByText("タイトルエラー")).toBeTruthy()

    expect(container).toMatchSnapshot()
  })
})
