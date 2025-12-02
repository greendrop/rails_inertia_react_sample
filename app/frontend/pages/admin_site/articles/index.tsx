import { Head } from '@inertiajs/react'

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
      <div>
        <h1>記事一覧</h1>
        <table>
          <thead>
            <tr>
              <th>タイトル</th>
              <th>作成日</th>
              <th>更新日</th>
              <th>公開状態</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((a) => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{new Date(a.created_at).toLocaleString()}</td>
                <td>{new Date(a.updated_at).toLocaleString()}</td>
                <td>{String(a.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
