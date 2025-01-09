import { EyeIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"

export type StartupCardType = {
  _id: number
  title: string
  description: string
  views: number
  category: string
  image: string
  author: {
    _id: number
    name: string
  }
  _createdAt: string
}

interface StartupCardProps {
  post: StartupCardType
}

export function StartupCard({ post }: StartupCardProps) {
  const {
    _id,
    title,
    description,
    views,
    category,
    image,
    author,
    _createdAt,
  } = post

  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup-card-date">{formatDate(_createdAt)}</p>

        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author._id}`}>
            <p className="text-16-medium line-clamp-1">{author.name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${author._id}`}>
          <Image
            src="https://placehold.co/48x48"
            alt="placeholder"
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>

      <Link href={`/startup/${_id}`}>
        <p className="startup-card-desc">{description}</p>

        <img src={image} alt="placeholder" className="startup-card-img" />
      </Link>

      <div className="flex-between mt-5 gap-3">
        <Link href={`/?query=${category.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>

        <Button className="startup-card-btn" asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  )
}
