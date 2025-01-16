import { BadgePlusIcon, LogInIcon, LogOutIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import { auth, signIn, signOut } from "@/lib/auth"

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
              <Link
                href="/startup/create"
                className={buttonVariants({
                  variant: "default",
                  className: "!rounded-full",
                })}
              >
                <BadgePlusIcon />
                <span className="max-sm:hidden">Create</span>
              </Link>

              <form
                action={async () => {
                  "use server"
                  await signOut({ redirectTo: "/" })
                }}
                className="flex items-center"
              >
                <Button
                  type="submit"
                  variant="outline"
                  className="rounded-full"
                >
                  <LogOutIcon />
                  <span className="max-sm:hidden">Logout</span>
                </Button>
              </form>

              <Link href={`/user/${session.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session.user?.image ?? ""}
                    alt={session.user?.name ?? ""}
                  />
                  <AvatarFallback className="text-16-medium">
                    {session.user?.name?.[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server"
                await signIn("github")
              }}
            >
              <Button type="submit" className="!rounded-full">
                <LogInIcon />
                <span className="max-sm:hidden">Login</span>
              </Button>
            </form>
          )}
        </div>
      </nav>
    </header>
  )
}
