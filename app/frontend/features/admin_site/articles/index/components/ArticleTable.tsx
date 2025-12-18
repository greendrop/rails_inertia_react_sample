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
  showLinkLabel: string
}

export default function ArticleTable({
  articles,
  articleFieldNames,
  showLinkLabel,
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
          <TableHead>
            <span className="sr-only">{articleFieldNames.operations}</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {articles.map((article) => (
          <ArticleTableRow
            key={article.id}
            article={article}
            showLinkLabel={showLinkLabel}
          />
        ))}
      </TableBody>
    </Table>
  )
}
