import { renderHook } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { useArticleFormErrors } from "@/features/admin_site/articles/hooks/useArticleFormErrors"

describe("useArticleFormErrors", () => {
  it("エラーがない場合にhasErrorsがfalseになり、各エラーメッセージがundefinedになること", () => {
    const { result } = renderHook(() =>
      useArticleFormErrors({
        errors: {},
      }),
    )

    expect(result.current.errorBag).toEqual({})
    expect(result.current.hasErrors).toBe(false)
    expect(result.current.errorMessages).toBeUndefined()
    expect(result.current.titleErrorMessages).toBeUndefined()
    expect(result.current.bodyErrorMessages).toBeUndefined()
    expect(result.current.statusErrorMessages).toBeUndefined()
    expect(result.current.publishedAtErrorMessages).toBeUndefined()
  })

  it("各フィールドのエラーメッセージが正しく分割されること", () => {
    const { result } = renderHook(() =>
      useArticleFormErrors({
        errors: {
          title: "タイトルエラー",
          body: ["本文エラー1", "本文エラー2"],
          status: "ステータスエラー",
          published_at: ["公開日時エラー"],
          base: "その他のエラー",
        },
      }),
    )

    expect(result.current.hasErrors).toBe(true)

    // 共通以外のエラー（excludeKeysの対象外）がerrorMessagesに含まれる
    expect(result.current.errorMessages).toEqual(["その他のエラー"])

    expect(result.current.titleErrorMessages).toEqual(["タイトルエラー"])
    expect(result.current.bodyErrorMessages).toEqual([
      "本文エラー1",
      "本文エラー2",
    ])
    expect(result.current.statusErrorMessages).toEqual(["ステータスエラー"])
    expect(result.current.publishedAtErrorMessages).toEqual(["公開日時エラー"])
  })
})
