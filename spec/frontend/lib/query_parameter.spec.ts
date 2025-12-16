import { describe, expect, it } from "vitest"
import {
  buildURLSearchParamsByQueryParameters,
  type FlatQueryParameters,
  flattenQueryParameters,
  type QueryParameters,
} from "@/lib/query_parameter"

describe("flattenQueryParameters", () => {
  it("フラットなオブジェクトをそのまま返す", () => {
    const params: QueryParameters = { a: 1, b: "test", c: true }
    const expected: FlatQueryParameters = { a: 1, b: "test", c: true }
    expect(flattenQueryParameters(params)).toEqual(expected)
  })

  it("ネストしたオブジェクトをフラット化する", () => {
    const params: QueryParameters = { a: 1, b: { c: 2, d: "x" } }
    const expected: FlatQueryParameters = { a: 1, "b[c]": 2, "b[d]": "x" }
    expect(flattenQueryParameters(params)).toEqual(expected)
  })

  it("配列をそのまま値として扱う", () => {
    const params: QueryParameters = { a: [1, 2, 3], b: "test" }
    const expected: FlatQueryParameters = { a: [1, 2, 3], b: "test" }
    expect(flattenQueryParameters(params)).toEqual(expected)
  })

  it("nullやundefinedも正しく扱う", () => {
    const params: QueryParameters = { a: null, b: undefined, c: 0 }
    const expected: FlatQueryParameters = { a: null, b: undefined, c: 0 }
    expect(flattenQueryParameters(params)).toEqual(expected)
  })

  it("多重ネストも正しくフラット化する", () => {
    const params: QueryParameters = { a: { b: { c: { d: 1 } } } }
    const expected: FlatQueryParameters = { "a[b][c][d]": 1 }
    expect(flattenQueryParameters(params)).toEqual(expected)
  })

  it("空オブジェクトは空のまま返す", () => {
    const params: QueryParameters = {}
    const expected: FlatQueryParameters = {}
    expect(flattenQueryParameters(params)).toEqual(expected)
  })
})

describe("buildURLSearchParamsByQueryParameters", () => {
  it("フラットなオブジェクトをURLSearchParamsに変換する", () => {
    const params: QueryParameters = { a: 1, b: "test", c: true }
    const searchParams = buildURLSearchParamsByQueryParameters(params)
    expect(searchParams.toString()).toBe("a=1&b=test&c=true")
  })

  it("ネストしたオブジェクトを正しく変換する", () => {
    const params: QueryParameters = { a: 1, b: { c: 2, d: "x" } }
    const searchParams = buildURLSearchParamsByQueryParameters(params)
    expect(searchParams.toString()).toBe("a=1&b%5Bc%5D=2&b%5Bd%5D=x")
  })

  it("配列を正しく変換する", () => {
    const params: QueryParameters = { a: [1, 2, 3], b: "test" }
    const searchParams = buildURLSearchParamsByQueryParameters(params)
    expect(searchParams.toString()).toBe("a=1&a=2&a=3&b=test")
  })

  it("nullやundefinedを空文字列に変換する", () => {
    const params: QueryParameters = { a: null, b: undefined, c: 0 }
    const searchParams = buildURLSearchParamsByQueryParameters(params)
    expect(searchParams.toString()).toBe("a=&b=&c=0")
  })

  it("多重ネストも正しく変換する", () => {
    const params: QueryParameters = { a: { b: { c: { d: 1 } } } }
    const searchParams = buildURLSearchParamsByQueryParameters(params)
    expect(searchParams.toString()).toBe("a%5Bb%5D%5Bc%5D%5Bd%5D=1")
  })

  it("空オブジェクトは空のまま返す", () => {
    const params: QueryParameters = {}
    const searchParams = buildURLSearchParamsByQueryParameters(params)
    expect(searchParams.toString()).toBe("")
  })
})
