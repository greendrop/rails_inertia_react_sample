export type QueryParametorValue = string | number | boolean | null | undefined
export type QueryParametors = {
  [key: string]: QueryParametorValue | QueryParametorValue[] | QueryParametors
}
export type FlatQueryParametors = { [key: string]: QueryParametorValue }

export function flattenQueryParametors(
  queryParametors: QueryParametors,
  parentKey: string | null = null,
  result: FlatQueryParametors = {},
): FlatQueryParametors {
  for (const [key, value] of Object.entries(queryParametors)) {
    const newKey = parentKey ? `${parentKey}[${key}]` : key
    if (value && typeof value === "object" && !Array.isArray(value)) {
      flattenQueryParametors(value as QueryParametors, newKey, result)
    } else {
      result[newKey] = value as QueryParametorValue
    }
  }
  return result
}
