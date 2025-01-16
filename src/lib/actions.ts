"use server"

import slugify from "slugify"

import { auth } from "@/lib/auth"
import { parseServerActionResponse } from "@/lib/utils"
import { writeClient } from "@/sanity/lib/write-client"

export async function createPitch(
  state: any,
  formData: FormData,
  pitch: string,
): Promise<ResponseType> {
  const session = await auth()
  if (!session) {
    return parseServerActionResponse({
      id: null,
      error: "Not authenticated",
      status: "UNAUTHORISED",
    })
  }

  const { title, description, category, link } = Object.fromEntries(
    Array.from(formData).filter(([key]) => key !== "pitch"),
  )

  const slug = slugify(title as string, {
    lower: true,
    strict: true,
  })

  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      pitch,
    }

    const result = await writeClient.create({
      _type: "startup",
      ...startup,
    })

    return parseServerActionResponse({
      id: result._id,
      error: "",
      status: "SUCCESS",
    })
  } catch (error) {
    console.error(error)

    return parseServerActionResponse({
      id: null,
      error: JSON.stringify(error),
      status: "ERROR",
    })
  }
}

type ResponseType = {
  id: string | null
  error: string
  status: Status
}

type Status = "INITIAL" | "SUCCESS" | "ERROR" | "UNAUTHORISED"
