export type QueryParameterValue = string | number | boolean | null | undefined
export type QueryParameters = {
  [key: string]: QueryParameterValue | QueryParameterValue[] | QueryParameters
}
export type FlatQueryParameters = {
  [key: string]: QueryParameterValue | QueryParameterValue[]
}

export function flattenQueryParameters(
  queryParameters: QueryParameters,
  parentKey: string | null = null,
  result: FlatQueryParameters = {},
): FlatQueryParameters {
  for (const [key, value] of Object.entries(queryParameters)) {
    const newKey = parentKey ? `${parentKey}[${key}]` : key
    if (value && typeof value === "object" && !Array.isArray(value)) {
      flattenQueryParameters(value as QueryParameters, newKey, result)
    } else {
      result[newKey] = value as QueryParameterValue
    }
  }
  return result
}
