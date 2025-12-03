import { Table, TableHeader, TableBody, TableRow, TableCell } from '@/components/admin_site/ui/table'
import ArticleTableRow from './ArticleTableRow'
import { Article } from '@/types/admin_site/articles/index'

export default function ArticleTable({ articles }: { articles: Article[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>タイトル</TableCell>
          <TableCell>ステータス</TableCell>
          <TableCell>作成日</TableCell>
          <TableCell>更新日</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {articles.map((article) => (
          <ArticleTableRow key={article.id} article={article} />
        ))}
      </TableBody>
    </Table>
  )
}