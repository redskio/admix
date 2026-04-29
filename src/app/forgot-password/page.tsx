"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    // Simulate sending — no actual email
    setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 600)
  }

  return (
    <main className="pt-16 min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo mark */}
        <div className="text-center mb-8">
          <span className="inline-block text-2xl font-extrabold text-violet-600 tracking-tight">
            AdMix
          </span>
          <p className="mt-1 text-sm text-gray-500">광고 자동화 플랫폼</p>
        </div>

        <Card className="border border-gray-200 shadow-xl shadow-violet-50">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-gray-900 text-center">
              비밀번호 재설정
            </CardTitle>
            <p className="text-sm text-gray-500 text-center mt-1">
              가입한 이메일을 입력하면 재설정 링크를 보내드립니다
            </p>
          </CardHeader>

          <CardContent>
            {sent ? (
              <div className="flex flex-col items-center gap-3 py-6 text-center">
                <CheckCircle className="h-12 w-12 text-green-500" />
                <p className="text-green-700 font-semibold text-base">
                  재설정 링크를 이메일로 전송했습니다
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium text-gray-700">{email}</span> 을(를) 확인해 주세요.
                  스팸함도 확인해 보세요.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    이메일
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 border-gray-300 focus-visible:ring-violet-500"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    "w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2.5 shadow-md shadow-violet-200",
                    loading && "opacity-70 cursor-not-allowed"
                  )}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      전송 중...
                    </span>
                  ) : (
                    "이메일 전송"
                  )}
                </Button>
              </form>
            )}

            {/* Back to login */}
            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-sm text-violet-600 hover:text-violet-700 font-medium"
              >
                <ArrowLeft className="h-4 w-4" />
                로그인으로 돌아가기
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
