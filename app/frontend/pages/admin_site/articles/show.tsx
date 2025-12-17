import { Head } from "@inertiajs/react"
import Layout from "@/components/admin_site/shared/Layout"
import PageHeader from "@/components/admin_site/shared/PageHeader"
import PageHeaderTitle from "@/components/admin_site/shared/PageHeaderTitle"
import PageHeaderTitleText from "@/components/admin_site/shared/PageHeaderTitleText"
import type { SharedProps } from "@/types/admin_site"
import type {
  ArticleDetail,
  ArticleFieldNames,
} from "@/types/admin_site/articles/show"

type ShowSpecificProps = {
  headTitle: string
  pageHeaderTitle: string
  article: ArticleDetail
  articleFieldNames: ArticleFieldNames
}

export type ShowProps = SharedProps & ShowSpecificProps

export default function Show({
  sidebar,
  headTitle,
  pageHeaderTitle,
  article,
  articleFieldNames,
}: ShowProps) {
  return (
    <>
      <Head title={headTitle} />
      <Layout sidebar={sidebar}>
        <div className="mb-4">
          <PageHeader>
            <PageHeaderTitle>
              <PageHeaderTitleText>{pageHeaderTitle}</PageHeaderTitleText>
            </PageHeaderTitle>
          </PageHeader>
        </div>

        <div className="flex">
          <div className="flex-auto">
            <table className="w-full border-collapse">
              <tbody>
                <tr>
                  <th className="text-left align-top p-2 w-40">
                    {articleFieldNames.id}
                  </th>
                  <td className="p-2">{article.id}</td>
                </tr>
                <tr>
                  <th className="text-left align-top p-2">
                    {articleFieldNames.title}
                  </th>
                  <td className="p-2">{article.title}</td>
                </tr>
                <tr>
                  <th className="text-left align-top p-2">
                    {articleFieldNames.status}
                  </th>
                  <td className="p-2">{String(article.status)}</td>
                </tr>
                <tr>
                  <th className="text-left align-top p-2">
                    {articleFieldNames.body}
                  </th>
                  <td className="p-2">
                    <div style={{ whiteSpace: "pre-wrap" }}>{article.body}</div>
                  </td>
                </tr>
                <tr>
                  <th className="text-left align-top p-2">
                    {articleFieldNames.createdAt}
                  </th>
                  <td className="p-2">
                    {new Date(article.createdAt).toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <th className="text-left align-top p-2">
                    {articleFieldNames.updatedAt}
                  </th>
                  <td className="p-2">
                    {new Date(article.updatedAt).toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </>
  )
}
