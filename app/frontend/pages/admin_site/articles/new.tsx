import type { ReactElement } from "react"
import FlashAlert from "@/components/admin_site/shared/FlashAlert"
import Layout from "@/components/admin_site/shared/Layout"
import MetaTags from "@/components/admin_site/shared/MetaTags"
import PageHeader from "@/components/admin_site/shared/PageHeader"
import PageHeaderTitle from "@/components/admin_site/shared/PageHeaderTitle"
import PageHeaderTitleText from "@/components/admin_site/shared/PageHeaderTitleText"
import ArticleNewForm from "@/features/admin_site/articles/new/components/ArticleNewForm"
import type {
  ArticleForm,
  ArticleFormFieldNames,
  ArticleStatusOption,
} from "@/features/admin_site/articles/types"

type NewProps = {
  pageHeaderTitle: string
  formAction: string
  form: ArticleForm
  formFieldNames: ArticleFormFieldNames
  statusOptions: ArticleStatusOption[]
  submitButtonLabel: string
  formErrorAlertTitle: string
}

export default function New({
  pageHeaderTitle,
  formAction,
  form,
  formFieldNames,
  statusOptions,
  submitButtonLabel,
  formErrorAlertTitle,
}: NewProps) {
  return (
    <>
      <MetaTags />
      <div className="mb-4">
        <PageHeader>
          <PageHeaderTitle>
            <PageHeaderTitleText>{pageHeaderTitle}</PageHeaderTitleText>
          </PageHeaderTitle>
        </PageHeader>
      </div>

      <div className="mb-4">
        <FlashAlert />
      </div>

      <div className="flex">
        <div className="flex-auto">
          <ArticleNewForm
            form={form}
            formAction={formAction}
            formFieldNames={formFieldNames}
            statusOptions={statusOptions}
            submitButtonLabel={submitButtonLabel}
            formErrorAlertTitle={formErrorAlertTitle}
          />
        </div>
      </div>
    </>
  )
}

New.layout = (page: ReactElement) => <Layout>{page}</Layout>
