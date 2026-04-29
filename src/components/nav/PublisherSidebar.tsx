"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Globe,
  Layers,
  TrendingUp,
  Settings,
  LogOut,
  Zap,
} from "lucide-react"

const navItems = [
  { href: "/publisher/dashboard", label: "대시보드", icon: LayoutDashboard },
  { href: "/publisher/media", label: "매체 관리", icon: Globe },
  { href: "/publisher/placements", label: "지면 설정", icon: Layers },
  { href: "/publisher/revenue", label: "수익 리포트", icon: TrendingUp },
  { href: "/publisher/settings", label: "설정", icon: Settings },
]

const publisherUser = {
  name: "매체사 관리자",
  company: "Publisher Co.",
}

export default function PublisherSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-full w-60 bg-gray-950 flex flex-col z-40">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <Link href="/publisher/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold text-white">AdMix</span>
        </Link>
        <p className="text-xs text-gray-500 mt-1 pl-10">매체사 포털</p>
      </div>

      {/* Nav */}
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

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-violet-600 flex items-center justify-center text-white text-sm font-bold">
            {publisherUser.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{publisherUser.name}</p>
            <p className="text-xs text-gray-400 truncate">{publisherUser.company}</p>
          </div>
        </div>
        <div className="mt-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            로그아웃
          </Link>
        </div>
      </div>
    </aside>
  )
}
