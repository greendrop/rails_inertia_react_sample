import { Head, Link } from "@inertiajs/react"

const dateFormatter = new Intl.DateTimeFormat("ja-JP", {
  dateStyle: "medium",
  timeStyle: "short",
})

export type ArticleSummary = {
  id: number
  title: string
  body_preview: string
  published_at: string | null
  detail_url: string
}

export type IndexProps = {
  page_title: string
  empty_message: string
  articles: ArticleSummary[]
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

export default function Index({
  page_title: pageTitle,
  empty_message: emptyMessage,
  articles,
}: IndexProps) {
  return (
    <>
      <Head title={pageTitle} />
      <section className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{pageTitle}</h1>
          <p className="mt-2 text-sm text-gray-600">
            最新の記事を公開日時が新しい順に表示します。
          </p>
        </div>

        {articles.length === 0 ? (
          <p className="rounded border border-dashed border-gray-300 px-4 py-8 text-center text-sm text-gray-600" role="status">
            {emptyMessage}
          </p>
        ) : (
          <ul className="flex flex-col gap-4">
            {articles.map((article) => (
              <li key={article.id} className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {formatPublishedAt(article.published_at)}
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-blue-700">
                  <Link href={article.detail_url} className="hover:underline focus-visible:underline">
                    {article.title}
                  </Link>
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-gray-700">{article.body_preview}</p>
                <div className="mt-4 text-sm font-semibold text-blue-700">
                  <Link href={article.detail_url} className="hover:underline focus-visible:underline">
                    続きを読む →
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}
