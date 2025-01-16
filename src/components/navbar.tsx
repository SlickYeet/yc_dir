import { auth, signIn, signOut } from "@/lib/auth"
import Image from "next/image"
import Link from "next/link"

export async function Navbar() {
  const session = await auth()
  const user = session?.user

  return (
    <header className="sticky top-0 bg-white/80 px-5 py-3 font-work-sans shadow-sm backdrop-blur-lg">
      <nav className="flex items-center justify-between">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          {user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>

              <form
                action={async () => {
                  "use server"
                  await signOut({ redirectTo: "/" })
                }}
              >
                <button type="submit">Logout</button>
              </form>

              <Link href={`/user/${session.id}`}>
                <span>{user.name}</span>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server"
                await signIn("github")
              }}
            >
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  )
}
