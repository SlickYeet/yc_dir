import { SearchForm } from "@/components/search-form"
import { StartupCard, type StartupCardType } from "@/components/startup-card"
import { client } from "@/sanity/lib/client"
import { STARTUPS_QUERY } from "@/sanity/lib/queries"

interface HomePageProps {
  searchParams: Promise<{ query: string }>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const query = (await searchParams).query

  const posts = (await client.fetch(STARTUPS_QUERY)) as StartupCardType[]

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
          {posts?.length > 0 ? (
            posts.map((post) => <StartupCard key={post._id} post={post} />)
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
    </>
  )
}
