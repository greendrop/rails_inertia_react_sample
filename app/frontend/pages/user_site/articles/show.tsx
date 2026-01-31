import { Head, Link } from "@inertiajs/react"

const dateFormatter = new Intl.DateTimeFormat("ja-JP", {
  dateStyle: "medium",
  timeStyle: "short",
})

type ArticleDetail = {
  id: number
  title: string
  body: string
  published_at: string | null
}

type ShowProps = {
  page_title: string
  index_url: string
  article: ArticleDetail
}

function formatPublishedAt(value: string | null): string {
  if (!value) {
    return "公開日未設定"
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return value
  }

  return dateFormatter.format(date)
}

export default function Show({ page_title: pageTitle, index_url: indexUrl, article }: ShowProps) {
  return (
    <>
      <Head title={pageTitle} />
      <section className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-8">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {formatPublishedAt(article.published_at)}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">{article.title}</h1>
          <div className="mt-6 whitespace-pre-line text-base leading-relaxed text-gray-800">
            {article.body}
          </div>
        </div>

        <div>
          <Link
            href={indexUrl}
            className="text-sm font-semibold text-blue-700 hover:underline focus-visible:underline"
          >
            ← 記事一覧に戻る
          </Link>
        </div>
      </section>
    </>
  )
}
