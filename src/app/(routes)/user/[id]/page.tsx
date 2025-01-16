import Image from "next/image"
import { notFound } from "next/navigation"
import { Suspense } from "react"

import { UserStartups } from "@/components/user-startups"
import { auth } from "@/lib/auth"
import { client } from "@/sanity/lib/client"
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries"

/**
 * ! Experimental Feature
 * ? Enables PPR for this page
 */
export const experimental_ppr = true

interface UserPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function UserPage({ params }: UserPageProps) {
  const { id } = await params
  const session = await auth()

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id })
  if (!user) return notFound()

  return (
    <>
      <section className="profile-container">
        <div className="profile-card">
          <div className="profile-title">
            <h3 className="text-24-black line-clamp-1 text-center uppercase">
              {user.name}
            </h3>
          </div>

          <Image
            src={user.image ?? ""}
            alt={user.name ?? ""}
            width={220}
            height={220}
            className="profile-image"
          />

          <p className="text-30-extrabold mt-7 text-center">
            @{user?.username}
          </p>
          <p className="text-14-normal mt-1 text-center">{user?.bio ?? null}</p>
        </div>

        <div className="flex flex-1 flex-col gap-5 lg:-mt-5">
          <p className="text-30-bold">
            {session?.id === id ? "Your" : `${user.name}'s`} Startups
          </p>
          <ul className="card-grid-sm">
            <Suspense fallback={<UserStartups.Skeleton />}>
              <UserStartups id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  )
}
