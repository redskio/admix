import Sidebar from "@/components/nav/Sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-60 overflow-auto">
        {children}
      </main>
    </div>
  )
}
