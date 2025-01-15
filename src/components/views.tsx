import { after } from "next/server"

import { Ping } from "@/components/ping"
import { formatNumber, formatViewText } from "@/lib/utils"
import { client } from "@/sanity/lib/client"
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries"
import { WriteClient } from "@/sanity/lib/write-client"

interface ViewProps {
  id: string
}

export async function Views({ id }: ViewProps) {
  const { views } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id })

  after(
    async () =>
      await WriteClient.patch(id)
        .set({ views: views + 1 })
        .commit(),
  )

  return (
    <div className="view-container">
      <div className="absolute -right-2 -top-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-black">
          {formatNumber(views)} {formatViewText(views)}
        </span>
      </p>
    </div>
  )
}
