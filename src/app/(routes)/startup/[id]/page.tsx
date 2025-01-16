import markdownit from "markdown-it"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Suspense } from "react"

import { StartupCard, StartupCardType } from "@/components/startup-card"
import { Skeleton } from "@/components/ui/skeleton"
import { Views } from "@/components/views"
import { formatDate } from "@/lib/utils"
import { client } from "@/sanity/lib/client"
import {
  PLAYLIST_BY_SLUG_QUERY,
  STARTUP_BY_ID_QUERY,
} from "@/sanity/lib/queries"

const md = markdownit()

/**
 * ! Experimental Feature
 * ? Enables PPR for this page
 */
export const experimental_ppr = true

interface StartupPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function StartupDetails({ params }: StartupPageProps) {
  const { id } = await params

  /**
   * ? Typescript is really upset about `select`
   * @error Property 'select' does not exist on type 'null'.ts(2339)
   * * The query works as intended
   */
  // @ts-expect-error: Typescript is really upset about select
  const [post, { select: editorPicks }] = await Promise.all([
    await client.fetch(STARTUP_BY_ID_QUERY, { id }),
    await client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "editor-picks",
    }),
  ])

  if (!post) return notFound()

  const parsedContent = md.render(post.pitch || "")

  return (
    <>
      <section className="pink-container !min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>

      <section className="section-container">
        <Image
          src={post.image!}
          alt={post.title!}
          width={1920}
          height={1080}
          className="h-auto max-h-[640px] w-full rounded-xl object-cover"
        />

        <div className="mx-auto mt-10 max-w-4xl space-y-5">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="mb-3 flex items-center gap-2"
            >
              <Image
                src={post.author?.image ?? ""}
                alt={post.author?.name ?? ""}
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />

              <div>
                <p className="text-20-medium">{post.author?.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{post.author?.username}
                </p>
              </div>
            </Link>

            <p className="category-tag">{post.category}</p>
          </div>

          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article
              dangerouslySetInnerHTML={{
                __html: parsedContent,
              }}
              className="prose max-w-4xl break-words font-work-sans"
            />
          ) : (
            <p className="no-result">
              No pitch details available for this startup.
            </p>
          )}
        </div>

        <hr className="divider" />

        {editorPicks?.length > 0 ? (
          <div className="mx-auto max-w-4xl">
            <p className="text-30-semibold">Editor Picks</p>

            <ul className="card-grid-sm mt-7">
              {editorPicks.map((startup: StartupCardType, i: number) => (
                <StartupCard key={i} startup={startup} />
              ))}
            </ul>
          </div>
        ) : null}

        <Suspense fallback={<Skeleton className="view-skeleton" />}>
          <Views id={id} />
        </Suspense>
      </section>
    </>
  )
}
