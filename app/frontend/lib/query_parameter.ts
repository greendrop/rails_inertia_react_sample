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

export function buildSearchParamsByQueryParameters(
  queryParameters: QueryParameters,
) : URLSearchParams {
  const flattenedQueryParameters = flattenQueryParameters(
    queryParameters,
  )
  const searchParams = new URLSearchParams()
  Object.entries(flattenedQueryParameters).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      searchParams.append(key, "")
    } else if (Array.isArray(value)) {
      Object.entries(value).forEach(([_, v]) => {
        if (v !== null && v !== undefined) {
          searchParams.append(key, String(v))
        }
      })
    } else {
      searchParams.append(key, String(value))
    }
  })
  return searchParams
}
