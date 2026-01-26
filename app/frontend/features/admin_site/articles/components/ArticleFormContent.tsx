import { Link } from "@inertiajs/react"
import { Button } from "@/components/admin_site/ui/button"
import { Input } from "@/components/admin_site/ui/input"
import { Textarea } from "@/components/admin_site/ui/textarea"
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/admin_site/ui-ext/native-select"
import FormErrorAlert from "../../components/FormErrorAlert"
import { useArticleFormErrors } from "../hooks/useArticleFormErrors"
import type {
  ArticleForm,
  ArticleFormFieldNames,
  ArticleStatusOption,
} from "../types"

type ArticleFormContentProps = {
  form: ArticleForm
  formFieldNames: ArticleFormFieldNames
  statusOptions: ArticleStatusOption[]
  submitButtonLabel: string
  formErrorAlertTitle: string
  errors: Record<string, string | string[]>
  processing: boolean
  cancelLinkHref?: string
  cancelLinkLabel?: string
}

export default function ArticleFormContent({
  form,
  formFieldNames,
  statusOptions,
  submitButtonLabel,
  formErrorAlertTitle,
  errors,
  processing,
  cancelLinkHref,
  cancelLinkLabel,
}: ArticleFormContentProps) {
  const {
    hasErrors,
    errorMessages,
    titleErrorMessages,
    bodyErrorMessages,
    statusErrorMessages,
    publishedAtErrorMessages,
  } = useArticleFormErrors({ errors })

  return (
    <>
      {hasErrors && (
        <FormErrorAlert
          title={formErrorAlertTitle}
          errorMessages={errorMessages}
        />
      )}

      <div className="mb-4">
        <label className="text-sm font-medium" htmlFor="article-title">
          {formFieldNames.title}
        </label>
        <Input
          name="article[title]"
          id="article-title"
          defaultValue={form.title}
          aria-invalid={titleErrorMessages ? "true" : undefined}
          aria-describedby={
            titleErrorMessages ? "article-title-error" : undefined
          }
        />
        {titleErrorMessages && (
          <div id="article-title-error">
            <ul>
              {titleErrorMessages.map((message) => (
                <li key={message} className="text-sm text-destructive">
                  {message}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium" htmlFor="article-body">
          {formFieldNames.body}
        </label>
        <Textarea
          name="article[body]"
          id="article-body"
          defaultValue={form.body}
          aria-invalid={bodyErrorMessages ? "true" : undefined}
          aria-describedby={
            bodyErrorMessages ? "article-body-error" : undefined
          }
        />
        {bodyErrorMessages && (
          <div id="article-body-error">
            <ul>
              {bodyErrorMessages.map((message) => (
                <li key={message} className="text-sm text-destructive">
                  {message}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium" htmlFor="article-status">
          {formFieldNames.status}
        </label>
        <NativeSelect
          fullWidth
          name="article[status]"
          id="article-status"
          defaultValue={form.status}
          aria-invalid={statusErrorMessages ? "true" : undefined}
          aria-describedby={
            statusErrorMessages ? "article-status-error" : undefined
          }
        >
          {statusOptions.map((option) => (
            <NativeSelectOption key={option.value} value={option.value}>
              {option.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
        {statusErrorMessages && (
          <div id="article-status-error">
            <ul>
              {statusErrorMessages.map((message) => (
                <li key={message} className="text-sm text-destructive">
                  {message}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium" htmlFor="article-published-at">
          {formFieldNames.publishedAt}
        </label>
        <Input
          name="article[published_at]"
          id="article-published-at"
          type="datetime-local"
          defaultValue={form.publishedAt}
          aria-invalid={publishedAtErrorMessages ? "true" : undefined}
          aria-describedby={
            publishedAtErrorMessages ? "article-published-at-error" : undefined
          }
        />
        {publishedAtErrorMessages && (
          <div id="article-published-at-error">
            <ul>
              {publishedAtErrorMessages.map((message) => (
                <li key={message} className="text-sm text-destructive">
                  {message}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mb-6">
        <Button
          type="submit"
          className="w-full"
          disabled={processing}
          aria-busy={processing}
        >
          {submitButtonLabel}
        </Button>
      </div>

      {cancelLinkHref && cancelLinkLabel && (
        <div className="mt-2">
          <Button asChild variant="outline" className="w-full">
            <Link href={cancelLinkHref}>{cancelLinkLabel}</Link>
          </Button>
        </div>
      )}
    </>
  )
}
