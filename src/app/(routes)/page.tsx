import { SearchForm } from "@/components/search-form"
import { StartupCard, type StartupCardType } from "@/components/startup-card"
import { sanityFetch, SanityLive } from "@/sanity/lib/live"
import { STARTUPS_QUERY } from "@/sanity/lib/queries"

interface HomePageProps {
  searchParams: Promise<{ query: string }>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const query = (await searchParams).query
  const params = { search: query || null }

  const { data } = await sanityFetch({
    query: STARTUPS_QUERY,
    params,
  })
  const startups = data as StartupCardType[]

  return (
    <>
      <section className="pink-container">
        <h1 className="heading">
          Pitch Your Startup,
          <br />
          Connect With Entrepreneurs
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section-container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>

        <ul className="card-grid mt-7">
          {startups?.length > 0 ? (
            startups.map((startup: StartupCardType) => (
              <StartupCard key={startup._id} startup={startup} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  )
}
