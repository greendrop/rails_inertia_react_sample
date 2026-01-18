import type { Errors } from "@/types/admin_site"

export function parseInertiaFormErrors(
  errors: Record<string, unknown>,
): Errors {
  const parsedErrors: Errors = {}
  for (const [key, value] of Object.entries(errors)) {
    if (typeof value === "string") {
      parsedErrors[key] = [value]
    } else if (Array.isArray(value)) {
      parsedErrors[key] = value.filter(
        (item): item is string => typeof item === "string",
      )
    }
  }
  return parsedErrors
}

export function getErrorMessages({
  errors,
  keys,
  excludeKeys,
}: {
  errors: Errors
  keys?: string[]
  excludeKeys?: string[]
}): string[] | undefined {
  if (keys) {
    const messages = Object.entries(errors)
      .filter(([key]) => keys.includes(key))
      .flatMap(([, value]) => value)

    if (messages.length === 0) {
      return undefined
    }

    return messages
  } else if (excludeKeys) {
    const messages = Object.entries(errors)
      .filter(([key]) => !excludeKeys.includes(key))
      .flatMap(([, value]) => value)

    if (messages.length === 0) {
      return undefined
    }

    return messages
  }

  const messages = Object.entries(errors).flatMap(([, value]) => value)

  if (messages.length === 0) {
    return undefined
  }

  return messages
}
