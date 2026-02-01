import type { Article } from "../types"
import ArticleCard from "./ArticleCard"

type ArticlesProps = {
  articles: Article[]
  readMoreLabel: string
}

export default function Articles({ articles, readMoreLabel }: ArticlesProps) {
  return (
    <div className="flex flex-col gap-4">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          readMoreLabel={readMoreLabel}
        />
      ))}
    </div>
  )
}
