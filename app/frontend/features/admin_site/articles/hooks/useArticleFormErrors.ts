import { useMemo } from "react"
import type { Errors } from "@/features/admin_site/shared/types"
import { getErrorMessages, parseInertiaFormErrors } from "@/lib/form_error"

type UseArticleFormErrorsParams = {
  errors: Record<string, string | string[]>
}

type ArticleFormErrors = {
  errorBag: Errors
  hasErrors: boolean
  errorMessages?: string[] | undefined
  titleErrorMessages?: string[] | undefined
  bodyErrorMessages?: string[] | undefined
  statusErrorMessages?: string[] | undefined
  publishedAtErrorMessages?: string[] | undefined
}

export const useArticleFormErrors = ({
  errors,
}: UseArticleFormErrorsParams): ArticleFormErrors => {
  return useMemo(() => {
    const errorBag = parseInertiaFormErrors(errors)

    const hasErrors = Object.keys(errorBag).length > 0

    const errorMessages = getErrorMessages({
      errors: errorBag,
      excludeKeys: ["title", "body", "status", "published_at"],
    })

    const titleErrorMessages = getErrorMessages({
      errors: errorBag,
      keys: ["title"],
    })

    const bodyErrorMessages = getErrorMessages({
      errors: errorBag,
      keys: ["body"],
    })

    const statusErrorMessages = getErrorMessages({
      errors: errorBag,
      keys: ["status"],
    })

    const publishedAtErrorMessages = getErrorMessages({
      errors: errorBag,
      keys: ["published_at"],
    })

    return {
      errorBag,
      hasErrors,
      errorMessages,
      titleErrorMessages,
      bodyErrorMessages,
      statusErrorMessages,
      publishedAtErrorMessages,
    }
  }, [errors])
}
