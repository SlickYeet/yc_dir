"use client"

import MDEditor from "@uiw/react-md-editor"
import { SendIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useActionState, useState } from "react"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createPitch } from "@/lib/actions"
import { formSchema } from "@/lib/validation"

export function StartupForm() {
  const router = useRouter()

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [pitch, setPitch] = useState<string>("")

  const handleSubmit = async (prevState: any, formData: FormData) => {
    setErrors({})

    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      }

      await formSchema.parseAsync(formValues)

      const result = await createPitch(prevState, formData, pitch)

      if (result.status === "SUCCESS") {
        toast.success("Success:", {
          description: "Your startup pitch has been created successfully",
        })

        router.push(`/startup/${result.id}`)
      }

      return result
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors
        setErrors(fieldErrors as unknown as Record<string, string>)
        toast.error("Error:", {
          description: "Validation failed",
        })

        return {
          ...prevState,
          error: "Validation failed",
          status: "ERROR",
        }
      }

      toast.error("Error:", {
        description: "An unexpected error occurred",
      })

      return {
        ...prevState,
        error: "An unexpected error occurred",
        status: "ERROR",
      }
    }
  }

  const [state, formAction, isPending] = useActionState(handleSubmit, {
    error: "",
    status: "INITIAL",
  })

  return (
    <form action={formAction} className="startup-form">
      <div>
        <label className="startup-form-label">Title</label>
        <Input
          id="title"
          name="title"
          required
          placeholder="Startup Title"
          className="startup-form-input"
        />
        {errors.title ? (
          <p className="startup-form-error">{errors.title}</p>
        ) : null}
      </div>

      <div>
        <label className="startup-form-label">Description</label>
        <Textarea
          id="description"
          name="description"
          required
          placeholder="Startup Description"
          className="startup-form-textarea"
        />
        {errors.description ? (
          <p className="startup-form-error">{errors.description}</p>
        ) : null}
      </div>

      <div>
        <label className="startup-form-label">Category</label>
        <Input
          id="category"
          name="category"
          required
          placeholder="Startup Category (Technology, Health, Education...)"
          className="startup-form-input"
        />
        {errors.category ? (
          <p className="startup-form-error">{errors.category}</p>
        ) : null}
      </div>

      <div>
        <label className="startup-form-label">Image URL</label>
        <Input
          id="link"
          name="link"
          required
          placeholder="Startup Image URL"
          className="startup-form-input"
        />
        {errors.link ? (
          <p className="startup-form-error">{errors.link}</p>
        ) : null}
      </div>

      <div data-color-mode="light">
        <label className="startup-form-label">Pitch</label>
        <MDEditor
          id="pitch"
          value={pitch}
          onChange={(v) => setPitch(v as string)}
          preview="edit"
          height={300}
          style={{
            borderRadius: 20,
            overflow: "hidden",
          }}
          textareaProps={{
            placeholder:
              "Briefly describe your startup and what problem it solves",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />
        {errors.pitch ? (
          <p className="startup-form-error">{errors.pitch}</p>
        ) : null}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="startup-form-btn text-white [&_svg]:size-5"
      >
        {isPending ? "Submitting..." : "Submit Your Startup"}
        <SendIcon className="ml-2" />
      </Button>
    </form>
  )
}
