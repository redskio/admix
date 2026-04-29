"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard, Megaphone, ImageIcon, CreditCard, Zap, LogOut, Settings, BarChart2
} from "lucide-react"

const navItems = [
  { href: "/dashboard", label: "대시보드", icon: LayoutDashboard },
  { href: "/campaigns", label: "캠페인", icon: Megaphone },
  { href: "/creatives", label: "소재 관리", icon: ImageIcon },
  { href: "/reports", label: "리포트", icon: BarChart2 },
  { href: "/billing", label: "정산", icon: CreditCard },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  let userName = "김재우"
  let userCompany = "WeirdSector"
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("admix-auth")
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed?.state?.user) {
          userName = parsed.state.user.name
          userCompany = parsed.state.user.company
        }
      }
    } catch {}
  }

  function handleLogout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("admix-auth")
    }
    router.push("/")
  }

  return (
    <aside className="fixed left-0 top-0 h-full w-60 bg-gray-950 flex flex-col z-40">
      <div className="p-6 border-b border-gray-800">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold text-white">AdMix</span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              pathname.startsWith(href)
                ? "bg-violet-600 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            )}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white text-sm font-bold">
            {userName[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{userName}</p>
            <p className="text-xs text-gray-400 truncate">{userCompany}</p>
          </div>
        </div>
        <div className="mt-2 space-y-1">
          <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800 w-full transition-colors">
            <Settings className="w-4 h-4" />설정
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800 w-full transition-colors"
          >
            <LogOut className="w-4 h-4" />로그아웃
          </button>
        </div>
      </div>
    </aside>
  )
}
