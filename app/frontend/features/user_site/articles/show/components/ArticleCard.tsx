import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/features/user_site/shared/components/ui/card"
import type { Article } from "../types"

type ArticleCardProps = {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{article.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{article.body}</p>
      </CardContent>
    </Card>
  )
}
