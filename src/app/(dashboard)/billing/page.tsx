import { mockUser, mockBillingHistory } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import {
  CreditCard,
  TrendingDown,
  TrendingUp,
  Plus,
  Calendar,
  ArrowUpCircle,
  ArrowDownCircle,
  Wallet,
} from "lucide-react"

function formatKRW(amount: number): string {
  return `₩${Math.abs(amount).toLocaleString("ko-KR")}`
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString("ko-KR", { month: "long", day: "numeric" })
}

const thisMonthUsage = mockBillingHistory
  .filter((h) => h.type === "usage" && h.date.startsWith("2026-04"))
  .reduce((sum, h) => sum + Math.abs(h.amount), 0)

const lastMonthUsage = 380000

export default function BillingPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">결제 및 크레딧</h1>
        <p className="text-sm text-gray-500 mt-1">크레딧 잔액과 사용 내역을 확인하세요</p>
      </div>

      {/* Top Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">
        {/* Credit Balance — Main Card */}
        <Card className="md:col-span-2 border-0 bg-gradient-to-br from-violet-600 to-purple-700 text-white shadow-lg shadow-violet-200">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="text-violet-200 text-sm font-medium mb-1">잔여 크레딧</p>
                <p className="text-4xl font-bold tracking-tight">
                  {formatKRW(mockUser.credits)}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
            </div>

            <Separator className="bg-white/20 mb-4" />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-violet-200 text-xs mb-0.5">현재 플랜</p>
                <p className="text-white font-semibold capitalize">{mockUser.plan} Plan</p>
              </div>
              <Link href="/billing/charge">
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-white text-violet-700 hover:bg-violet-50 gap-1.5 font-semibold"
                >
                  <Plus className="w-4 h-4" />
                  충전하기
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Usage Stats */}
        <div className="flex flex-col gap-4">
          <Card className="border-gray-200 flex-1">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                <TrendingDown className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">이번달 사용</p>
                <p className="text-lg font-bold text-gray-900">{formatKRW(thisMonthUsage)}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 flex-1">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                <TrendingDown className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">지난달 사용</p>
                <p className="text-lg font-bold text-gray-900">{formatKRW(lastMonthUsage)}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Next Charge Estimate */}
      <Card className="border-gray-200 mb-7 bg-amber-50 border-amber-200">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5 text-amber-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-amber-800">다음 충전 예상일</p>
            <p className="text-xs text-amber-600 mt-0.5">
              현재 소비 속도 기준으로 약 <strong>2026년 5월 12일</strong>에 크레딧이 소진될 예정입니다.
              미리 충전하시면 캠페인 중단 없이 운영할 수 있습니다.
            </p>
          </div>
          <Link href="/billing/charge" className="shrink-0">
            <Button
              size="sm"
              className="bg-amber-500 hover:bg-amber-600 text-white text-xs"
            >
              지금 충전
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card className="border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-gray-800 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-violet-600" />
            거래 내역
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Table Header */}
          <div className="grid grid-cols-12 px-6 py-2.5 border-b border-gray-100 bg-gray-50">
            <div className="col-span-2 text-xs font-medium text-gray-500 uppercase tracking-wide">날짜</div>
            <div className="col-span-2 text-xs font-medium text-gray-500 uppercase tracking-wide">유형</div>
            <div className="col-span-4 text-xs font-medium text-gray-500 uppercase tracking-wide">내용</div>
            <div className="col-span-2 text-xs font-medium text-gray-500 uppercase tracking-wide text-right">금액</div>
            <div className="col-span-2 text-xs font-medium text-gray-500 uppercase tracking-wide text-right">잔액</div>
          </div>

          {/* Table Rows */}
          {[...mockBillingHistory].reverse().map((item, idx) => (
            <div key={item.id}>
              <div className="grid grid-cols-12 px-6 py-4 items-center hover:bg-gray-50 transition-colors">
                {/* Date */}
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">{formatDate(item.date)}</p>
                </div>

                {/* Type Badge */}
                <div className="col-span-2">
                  {item.type === "charge" ? (
                    <Badge className="gap-1 bg-green-50 text-green-700 border-green-200 text-xs" variant="outline">
                      <ArrowUpCircle className="w-3 h-3" />
                      충전
                    </Badge>
                  ) : (
                    <Badge className="gap-1 bg-red-50 text-red-600 border-red-200 text-xs" variant="outline">
                      <ArrowDownCircle className="w-3 h-3" />
                      사용
                    </Badge>
                  )}
                </div>

                {/* Description */}
                <div className="col-span-4">
                  <p className="text-sm text-gray-700 truncate">{item.description}</p>
                </div>

                {/* Amount */}
                <div className="col-span-2 text-right">
                  <p
                    className={`text-sm font-semibold ${
                      item.type === "charge" ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {item.type === "charge" ? "+" : "-"}
                    {formatKRW(item.amount)}
                  </p>
                </div>

                {/* Balance */}
                <div className="col-span-2 text-right">
                  <p className="text-sm text-gray-900 font-medium">{formatKRW(item.balance)}</p>
                </div>
              </div>
              {idx < mockBillingHistory.length - 1 && (
                <Separator className="mx-6" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
