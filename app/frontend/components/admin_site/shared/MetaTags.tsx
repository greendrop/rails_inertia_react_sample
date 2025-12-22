// REF: https://inertia-rails.dev/cookbook/server-managed-meta-tags

import { Head } from "@inertiajs/react"
import React from "react"
import usePage from "@/hooks/admin_site/usePage"

type MetaTag = {
  tagName: string
  headKey: string
  innerContent?: string | Record<string, unknown>
  httpEquiv?: string
  [key: string]: string | undefined | Record<string, unknown>
}

type SharedPropsWithMeta = {
  _inertia_meta?: MetaTag[]
}

const MetaTags = () => {
  const { _inertia_meta } = usePage().props as SharedPropsWithMeta
  const metas = _inertia_meta ?? []
  return (
    <Head>
      {metas.map((meta: MetaTag) => {
        const { tagName, innerContent, headKey, httpEquiv, ...attrs } = meta

        let stringifiedInnerContent: string | undefined
        if (innerContent != null) {
          stringifiedInnerContent =
            typeof innerContent === "string"
              ? innerContent
              : JSON.stringify(innerContent)
        }

        return React.createElement(tagName, {
          key: headKey,
          "head-key": headKey,
          ...(httpEquiv ? { "http-equiv": httpEquiv } : {}),
          ...attrs,
          ...(stringifiedInnerContent
            ? { dangerouslySetInnerHTML: { __html: stringifiedInnerContent } }
            : {}),
        })
      })}
    </Head>
  )
}

export default MetaTags
