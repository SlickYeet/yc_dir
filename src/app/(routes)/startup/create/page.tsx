import { redirect } from "next/navigation"

import { StartupForm } from "@/components/startup-form"
import { auth } from "@/lib/auth"

export default async function CreateStartup() {
  const session = await auth()
  if (!session) redirect("/")

  return (
    <>
      <section className="pink-container !min-h-[230px]">
        <h1 className="heading">Submit Your Startup</h1>
      </section>

      <StartupForm />
    </>
  )
}
