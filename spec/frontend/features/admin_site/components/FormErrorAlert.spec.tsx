import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import FormErrorAlert from "@/features/admin_site/components/FormErrorAlert"

describe("FormErrorAlert", () => {
  it("エラーメッセージがある場合に正しくレンダリングされる（スナップショット）", () => {
    const { container } = render(
      <FormErrorAlert
        title="入力内容を確認してください。"
        errorMessages={["エラー1", "エラー2"]}
      />,
    )

    expect(container).toMatchSnapshot()
  })

  it("エラーメッセージがない場合に正しくレンダリングされる（スナップショット）", () => {
    const { container } = render(
      <FormErrorAlert title="入力内容を確認してください。" />,
    )

    expect(container).toMatchSnapshot()
  })
})
