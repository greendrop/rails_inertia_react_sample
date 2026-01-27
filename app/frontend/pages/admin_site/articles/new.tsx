import type { ReactElement } from "react"
import ArticleNewForm from "@/features/admin_site/articles/new/components/ArticleNewForm"
import type {
  ArticleForm,
  ArticleFormFieldNames,
  ArticleStatusOption,
} from "@/features/admin_site/articles/types"
import FlashAlert from "@/features/admin_site/shared/components/FlashAlert"
import Layout from "@/features/admin_site/shared/components/Layout"
import MetaTags from "@/features/admin_site/shared/components/MetaTags"
import PageHeader from "@/features/admin_site/shared/components/PageHeader"
import PageHeaderTitle from "@/features/admin_site/shared/components/PageHeaderTitle"
import PageHeaderTitleText from "@/features/admin_site/shared/components/PageHeaderTitleText"

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
