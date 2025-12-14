import { describe, expect, it } from "vitest"
import {
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
