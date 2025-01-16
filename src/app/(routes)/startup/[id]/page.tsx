import markdownit from "markdown-it"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Suspense } from "react"

import { Skeleton } from "@/components/ui/skeleton"
import { Views } from "@/components/views"
import { formatDate } from "@/lib/utils"
import { client } from "@/sanity/lib/client"
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries"

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

  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id })
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
        <img
          src={post.image!}
          alt="thumbnail"
          className="h-auto max-h-[640px] w-full rounded-xl object-cover"
        />

        <div className="mx-auto mt-10 max-w-4xl space-y-5">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="mb-3 flex items-center gap-2"
            >
              <Image
                src={post.author?.image!}
                alt={post.author?.name!}
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

        {/*
        // TODO: EDITOR SELECTED STARTUPS
        */}

        <Suspense fallback={<Skeleton className="view-skeleton" />}>
          <Views id={id} />
        </Suspense>
      </section>
    </>
  )
}
