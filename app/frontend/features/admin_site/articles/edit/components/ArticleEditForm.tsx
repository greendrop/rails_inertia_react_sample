import { Form } from "@inertiajs/react"
import ArticleFormContent from "../../components/ArticleFormContent"
import type {
  ArticleForm,
  ArticleFormFieldNames,
  ArticleStatusOption,
} from "../../types"

export type ArticleEditFormProps = {
  form: ArticleForm
  formAction: string
  formFieldNames: ArticleFormFieldNames
  statusOptions: ArticleStatusOption[]
  submitButtonLabel: string
  formErrorAlertTitle: string
  cancelLinkHref: string
  cancelButtonLabel: string
}

export default function ArticleEditForm({
  form,
  formAction,
  formFieldNames,
  statusOptions,
  submitButtonLabel,
  formErrorAlertTitle,
  cancelLinkHref,
  cancelButtonLabel,
}: ArticleEditFormProps) {
  return (
    <Form action={formAction} method="patch">
      {({ errors, processing }) => {
        return (
          <ArticleFormContent
            form={form}
            formFieldNames={formFieldNames}
            statusOptions={statusOptions}
            submitButtonLabel={submitButtonLabel}
            formErrorAlertTitle={formErrorAlertTitle}
            errors={errors}
            processing={processing}
            cancelLinkHref={cancelLinkHref}
            cancelLinkLabel={cancelButtonLabel}
          />
        )
      }}
    </Form>
  )
}
