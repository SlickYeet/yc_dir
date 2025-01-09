import { Navbar } from "@/components/navbar"

export default function RouteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-work-sans">
      <Navbar />
      {children}
    </main>
  )
}
