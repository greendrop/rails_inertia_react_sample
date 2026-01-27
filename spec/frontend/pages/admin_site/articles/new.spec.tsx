import { render } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import type {
  ArticleForm,
  ArticleFormFieldNames,
  ArticleStatusOption,
} from "@/features/admin_site/articles/types"
import New from "@/pages/admin_site/articles/new"

vi.mock("@/features/admin_site/shared/components/MetaTags", () => {
  return {
    default: () => <div data-testid="meta-tags" />,
  }
})
vi.mock("@/features/admin_site/shared/components/FlashAlert", () => {
  return {
    default: () => <div data-testid="flash-alert" />,
  }
})

describe("New (記事新規作成ページ)", () => {
  it("正しくレンダリングされる（スナップショット）", () => {
    const pageHeaderTitle = "記事新規作成"
    const formAction = "/admin/articles"
    const submitButtonLabel = "作成"
    const formErrorAlertTitle = "入力内容を確認してください。"

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

    const { container } = render(
      <New
        pageHeaderTitle={pageHeaderTitle}
        formAction={formAction}
        form={form}
        formFieldNames={formFieldNames}
        statusOptions={statusOptions}
        submitButtonLabel={submitButtonLabel}
        formErrorAlertTitle={formErrorAlertTitle}
      />,
    )
    expect(container).toMatchSnapshot()
  })
})
