import PublisherSidebar from "@/components/nav/PublisherSidebar"

export default function PublisherLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <PublisherSidebar />
      <main className="flex-1 ml-60 overflow-auto">{children}</main>
    </div>
  )
}
