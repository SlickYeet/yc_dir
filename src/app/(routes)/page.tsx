import { SearchForm } from "@/components/search-form"
import { StartupCard, StartupCardType } from "@/components/startup-card"

interface HomePageProps {
  searchParams: Promise<{ query: string }>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const query = (await searchParams).query

  const posts = [
    {
      _id: 1,
      title: "We Robots",
      description:
        "We Robots is a startup that is focused on building robots that can help with household chores.",
      views: 55,
      category: "Robots",
      image:
        "https://images.unsplash.com/photo-1634912314704-c646c586b131?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      author: {
        _id: 1,
        name: "John Doe",
      },
      _createdAt: new Date() as unknown as string,
    },
  ]

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
            posts.map((post: StartupCardType, index: number) => (
              <StartupCard key={post._id} post={post} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
    </>
  )
}
