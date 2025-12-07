import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/admin_site/ui/table"
import type {
  Article,
  ArticleColumnNames,
} from "@/types/admin_site/articles/index"
import ArticleTableRow from "./ArticleTableRow"

export type ArticleTableProps = {
  articles: Article[]
  articleColumnNames: ArticleColumnNames
}

export default function ArticleTable({
  articles,
  articleColumnNames,
}: ArticleTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{articleColumnNames.id}</TableHead>
          <TableHead>{articleColumnNames.title}</TableHead>
          <TableHead>{articleColumnNames.status}</TableHead>
          <TableHead>{articleColumnNames.createdAt}</TableHead>
          <TableHead>{articleColumnNames.updatedAt}</TableHead>
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
