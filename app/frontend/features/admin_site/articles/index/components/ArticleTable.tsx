import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/admin_site/ui/table"
import type { Article, ArticleFieldNames } from "../types"
import ArticleTableRow from "./ArticleTableRow"

export type ArticleTableProps = {
  articles: Article[]
  articleFieldNames: ArticleFieldNames
}

export default function ArticleTable({
  articles,
  articleFieldNames,
}: ArticleTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{articleFieldNames.id}</TableHead>
          <TableHead>{articleFieldNames.title}</TableHead>
          <TableHead>{articleFieldNames.status}</TableHead>
          <TableHead>{articleFieldNames.createdAt}</TableHead>
          <TableHead>{articleFieldNames.updatedAt}</TableHead>
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
