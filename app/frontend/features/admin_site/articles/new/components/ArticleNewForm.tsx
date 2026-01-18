import { Form } from "@inertiajs/react"
import ArticleFormConent from "../../components/ArticleFormContent"
import type {
  ArticleForm,
  ArticleFormFieldNames,
  ArticleStatusOption,
} from "../../types"

export type ArticleFormProps = {
  form: ArticleForm
  formAction: string
  formFieldNames: ArticleFormFieldNames
  statusOptions: ArticleStatusOption[]
  submitButtonLabel: string
  formErrorAlertTitle: string
}

export default function ArticleNewForm({
  form,
  formAction,
  formFieldNames,
  statusOptions,
  submitButtonLabel,
  formErrorAlertTitle,
}: ArticleFormProps) {
  return (
    <Form action={formAction} method="post">
      {({ errors, processing }) => {
        return (
          <ArticleFormConent
            form={form}
            formFieldNames={formFieldNames}
            statusOptions={statusOptions}
            submitButtonLabel={submitButtonLabel}
            formErrorAlertTitle={formErrorAlertTitle}
            errors={errors}
            processing={processing}
          />
        )
      }}
    </Form>
  )
}
