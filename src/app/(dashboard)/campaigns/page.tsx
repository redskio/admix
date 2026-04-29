"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { mockCampaigns } from "@/lib/mock-data"
import { PlusCircle, Eye, MousePointerClick, TrendingUp, RefreshCw, CalendarDays } from "lucide-react"

type FilterTab = "all" | "active" | "paused" | "draft"

const TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "active", label: "집행중" },
  { key: "paused", label: "일시정지" },
  { key: "draft", label: "초안" },
]

function formatKRW(amount: number): string {
  return `₩${amount.toLocaleString("ko-KR")}`
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    active: { label: "집행중", className: "bg-green-100 text-green-700 border border-green-200" },
    paused: { label: "일시정지", className: "bg-yellow-100 text-yellow-700 border border-yellow-200" },
    draft: { label: "초안", className: "bg-gray-100 text-gray-600 border border-gray-200" },
  }
  const cfg = map[status] ?? { label: status, className: "bg-gray-100 text-gray-600 border border-gray-200" }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${cfg.className}`}>
      {cfg.label}
    </span>
  )
}

function TypeBadge({ type }: { type: string }) {
  if (type === "vertical") {
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-violet-100 text-violet-700 border border-violet-200">
        버티컬형
      </span>
    )
  }
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
      예산소진형
    </span>
  )
}

export default function CampaignsPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all")

  const filtered = mockCampaigns.filter((c) => {
    if (activeTab === "all") return true
    return c.status === activeTab
  })

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">캠페인 관리</h1>
          <p className="text-sm text-gray-500 mt-1">총 {mockCampaigns.length}개 캠페인</p>
        </div>
        <Link href="/campaigns/new">
          <Button className="bg-violet-600 hover:bg-violet-700 text-white gap-2">
            <PlusCircle className="w-4 h-4" />
            새 캠페인 만들기
          </Button>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 mb-6 border-b border-gray-200">
        {TABS.map((tab) => {
          const count =
            tab.key === "all"
              ? mockCampaigns.length
              : mockCampaigns.filter((c) => c.status === tab.key).length
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
                activeTab === tab.key
                  ? "border-violet-600 text-violet-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
              <span
                className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs ${
                  activeTab === tab.key
                    ? "bg-violet-100 text-violet-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Campaign Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <RefreshCw className="w-7 h-7 text-gray-400" />
          </div>
          <p className="text-gray-500 font-medium">해당 상태의 캠페인이 없습니다</p>
          <p className="text-sm text-gray-400 mt-1">새 캠페인을 만들어보세요</p>
          <Link href="/campaigns/new">
            <Button className="mt-4 bg-violet-600 hover:bg-violet-700 text-white gap-2">
              <PlusCircle className="w-4 h-4" />
              새 캠페인 만들기
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((campaign) => {
            const budgetRatio = campaign.budget > 0 ? (campaign.spent / campaign.budget) * 100 : 0

            return (
              <Card key={campaign.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <h3 className="text-base font-semibold text-gray-900">{campaign.name}</h3>
                        <StatusBadge status={campaign.status} />
                        <TypeBadge type={campaign.type} />
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <CalendarDays className="w-3.5 h-3.5" />
                        <span>
                          {formatDate(campaign.startDate)} ~ {formatDate(campaign.endDate)}
                        </span>
                      </div>
                    </div>
                    <Link href={`/campaigns/${campaign.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-violet-600 border-violet-200 hover:bg-violet-50 hover:border-violet-400"
                      >
                        상세보기
                      </Button>
                    </Link>
                  </div>

                  {/* Budget Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                      <span>예산 집행</span>
                      <span className="font-medium text-gray-700">
                        {formatKRW(campaign.spent)}
                        <span className="text-gray-400 font-normal"> / {formatKRW(campaign.budget)}</span>
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-1.5 rounded-full transition-all ${
                          budgetRatio >= 90
                            ? "bg-red-500"
                            : budgetRatio >= 60
                            ? "bg-amber-500"
                            : "bg-violet-500"
                        }`}
                        style={{ width: `${Math.min(budgetRatio, 100)}%` }}
                      />
                    </div>
                    <p className="text-right text-xs text-gray-400 mt-0.5">{budgetRatio.toFixed(1)}% 집행</p>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-4 gap-3 pt-4 border-t border-gray-100">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-0.5">
                        <Eye className="w-3 h-3" />
                        <span>노출</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-800">
                        {campaign.impressions.toLocaleString("ko-KR")}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-0.5">
                        <MousePointerClick className="w-3 h-3" />
                        <span>클릭</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-800">
                        {campaign.clicks.toLocaleString("ko-KR")}
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-0.5">
                        <TrendingUp className="w-3 h-3" />
                        <span>CTR</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-800">{campaign.ctr}%</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mb-0.5">
                        <span className="text-xs">✓</span>
                        <span>전환</span>
                      </div>
                      <p className="text-sm font-semibold text-gray-800">
                        {campaign.conversions.toLocaleString("ko-KR")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
