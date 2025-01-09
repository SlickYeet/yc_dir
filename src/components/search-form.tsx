import { SearchIcon } from "lucide-react"
import Form from "next/form"

import { SearchFormReset } from "@/components/search-form-reset"

interface SearchFormProps {
  query: string
}

export function SearchForm({ query }: SearchFormProps) {
  return (
    <Form action="/" scroll={false} className="search-form">
      <input
        name="query"
        defaultValue={query}
        placeholder="Search Startups"
        className="search-input"
      />

      <div className="flex gap-2">
        {query ? <SearchFormReset /> : null}

        <button type="submit" className="search-btn text-white">
          <SearchIcon className="size-5" />
        </button>
      </div>
    </Form>
  )
}
