import { router } from "@inertiajs/react"
import type { ReactElement } from "react"
import FlashAlert from "@/components/admin_site/shared/FlashAlert"
import Layout from "@/components/admin_site/shared/Layout"
import MetaTags from "@/components/admin_site/shared/MetaTags"
import PageHeader from "@/components/admin_site/shared/PageHeader"
import PageHeaderAction from "@/components/admin_site/shared/PageHeaderAction"
import PageHeaderTitle from "@/components/admin_site/shared/PageHeaderTitle"
import PageHeaderTitleText from "@/components/admin_site/shared/PageHeaderTitleText"
import { Button } from "@/components/admin_site/ui/button"
import ArticleDefinitionList from "@/features/admin_site/articles/show/components/ArticleDefinitionList"
import type {
  Article,
  ArticleFieldNames,
} from "@/features/admin_site/articles/show/types"

type ShowProps = {
  pageHeaderTitle: string
  article: Article
  articleFieldNames: ArticleFieldNames
  destroyButtonLabel: string
  destroyConfirmMessage: string
  destroyLinkHref: string
}

export default function Show({
  pageHeaderTitle,
  article,
  articleFieldNames,
  destroyButtonLabel,
  destroyConfirmMessage,
  destroyLinkHref,
}: ShowProps) {
  const handleDestroy = () => {
    if (!window.confirm(destroyConfirmMessage)) {
      return
    }

    router.delete(destroyLinkHref)
  }

  return (
    <>
      <MetaTags />
      <div className="mb-4">
        <PageHeader>
          <PageHeaderTitle>
            <PageHeaderTitleText>{pageHeaderTitle}</PageHeaderTitleText>
          </PageHeaderTitle>
          <PageHeaderAction>
            <Button type="button" variant="destructive" onClick={handleDestroy}>
              {destroyButtonLabel}
            </Button>
          </PageHeaderAction>
        </PageHeader>
      </div>

      <div className="mb-4">
        <FlashAlert />
      </div>

      <div className="flex">
        <div className="flex-auto">
          <ArticleDefinitionList
            article={article}
            articleFieldNames={articleFieldNames}
          />
        </div>
      </div>
    </>
  )
}

Show.layout = (page: ReactElement) => <Layout>{page}</Layout>
