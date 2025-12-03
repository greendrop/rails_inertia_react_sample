import { Head } from '@inertiajs/react'
import Layout from '@/components/admin_site/Layout'
import ArticleTable from '@/components/admin_site/articles/index/ArticleTable'

type Article = {
  id: number
  title: string
  status: string
  created_at: string
  updated_at: string
}

export default function Index({ articles }: { articles: Article[] }) {
  return (
    <>
      <Head title="記事一覧" />
      <Layout>
        <div>
          <h1>記事一覧</h1>

          <ArticleTable articles={articles} />
        </div>
      </Layout>
    </>
  )
}
