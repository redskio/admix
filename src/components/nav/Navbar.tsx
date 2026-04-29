"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()
  const isAuth = pathname.startsWith("/dashboard") ||
    pathname.startsWith("/campaigns") ||
    pathname.startsWith("/creatives") ||
    pathname.startsWith("/billing")

  if (isAuth) return null

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">AdMix</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">서비스 소개</Link>
            <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">요금제</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">로그인</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-violet-600 hover:bg-violet-700 text-white">무료 시작</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
