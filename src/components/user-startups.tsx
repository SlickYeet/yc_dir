import { StartupCard, StartupCardType } from "@/components/startup-card"
import { Skeleton } from "@/components/ui/skeleton"
import { auth } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { client } from "@/sanity/lib/client"
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries"

export async function UserStartups({ id }: { id: string }) {
  const session = await auth()

  const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id })

  return (
    <>
      {startups.length > 0 ? (
        startups.map((startup: StartupCardType) => (
          <StartupCard key={startup._id} startup={startup} />
        ))
      ) : (
        <p className="no-results">
          {id === session?.id ? "You have" : "This user has"} no startups yet.
        </p>
      )}
    </>
  )
}

UserStartups.Skeleton = function UserStartupsSkeleton() {
  return Array.from({ length: 6 }).map((_, index) => (
    <li key={index} className={cn("skeleton", index)}>
      <Skeleton className="startup-card-skeleton" />
    </li>
  ))
}
