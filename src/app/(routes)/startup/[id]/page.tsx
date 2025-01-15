import { notFound } from "next/navigation"

import { client } from "@/sanity/lib/client"
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries"

export const experimental_ppr = true

interface StartupPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function StartupPage({ params }: StartupPageProps) {
  const { id } = await params

  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id })
  if (!post) return notFound()

  return (
    <>
      <h1 className="text-3xl">{post.title}</h1>
    </>
  )
}
