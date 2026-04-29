"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { mockCampaigns, mockCreatives, mockMedia } from "@/lib/mock-data"
import {
  ArrowLeft,
  Eye,
  MousePointerClick,
  TrendingUp,
  ShoppingCart,
  Pencil,
  PauseCircle,
  PlayCircle,
  CalendarDays,
  BarChart2,
  ImageIcon,
  Newspaper,
} from "lucide-react"

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
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${cfg.className}`}>
      {cfg.label}
    </span>
  )
}

const MOCK_CHART_DATA = [
  { day: "4/23", impressions: 38200, clicks: 1180 },
  { day: "4/24", impressions: 41500, clicks: 1330 },
  { day: "4/25", impressions: 36800, clicks: 1050 },
  { day: "4/26", impressions: 44200, clicks: 1420 },
  { day: "4/27", impressions: 52100, clicks: 1680 },
  { day: "4/28", impressions: 39600, clicks: 1260 },
  { day: "4/29", impressions: 47800, clicks: 1510 },
]

const MOCK_MEDIA_PERFORMANCE = [
  { name: "맘카페", impressions: 168300, clicks: 5240, ctr: 3.11, spend: 820000 },
  { name: "인벤", impressions: 116200, clicks: 3680, ctr: 3.17, spend: 520000 },
]

function BarChart({ data }: { data: typeof MOCK_CHART_DATA }) {
  const maxImpressions = Math.max(...data.map((d) => d.impressions))
  return (
    <div className="mt-4">
      <div className="flex items-end gap-2 h-40">
        {data.map((d, i) => {
          const heightPct = (d.impressions / maxImpressions) * 100
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs text-gray-500 font-medium">{(d.impressions / 1000).toFixed(0)}K</span>
              <div className="w-full relative" style={{ height: "100px" }}>
                <div
                  className="absolute bottom-0 w-full bg-violet-500 rounded-t-sm opacity-80 hover:opacity-100 transition-opacity"
                  style={{ height: `${heightPct}%` }}
                  title={`노출: ${d.impressions.toLocaleString("ko-KR")}`}
                />
              </div>
              <span className="text-xs text-gray-400">{d.day}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function CampaignDetailClient({ id }: { id: string }) {
  const [activeTab, setActiveTab] = useState<"creatives" | "media">("creatives")
  const campaign = mockCampaigns.find((c) => c.id === id)

  if (!campaign) {
    return (
      <div className="p-8 text-center">
        <div className="text-gray-400 text-lg mb-4">캠페인을 찾을 수 없습니다</div>
        <Link href="/campaigns">
          <Button variant="outline">캠페인 목록으로</Button>
        </Link>
      </div>
    )
  }

  const creative = campaign.creativeId ? mockCreatives.find((c) => c.id === campaign.creativeId) : null
  const budgetRatio = campaign.budget > 0 ? (campaign.spent / campaign.budget) * 100 : 0
  const daysTotal = Math.max(1, Math.ceil((new Date(campaign.endDate).getTime() - new Date(campaign.startDate).getTime()) / (1000 * 60 * 60 * 24)))
  const dailyBurn = campaign.spent > 0 ? Math.round(campaign.spent / Math.min(29, daysTotal)) : 0

  return (
    <div className="p-8">
      <Link href="/campaigns">
        <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />캠페인 목록
        </button>
      </Link>

      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <h1 className="text-2xl font-bold text-gray-900">{campaign.name}</h1>
            <StatusBadge status={campaign.status} />
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <CalendarDays className="w-4 h-4" />
            <span>{formatDate(campaign.startDate)} ~ {formatDate(campaign.endDate)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 border-gray-200 text-gray-600 hover:bg-gray-50">
            <Pencil className="w-3.5 h-3.5" />수정
          </Button>
          {campaign.status === "active" ? (
            <Button variant="outline" size="sm" className="gap-2 border-yellow-200 text-yellow-700 hover:bg-yellow-50">
              <PauseCircle className="w-3.5 h-3.5" />일시정지
            </Button>
          ) : campaign.status === "paused" ? (
            <Button variant="outline" size="sm" className="gap-2 border-green-200 text-green-700 hover:bg-green-50">
              <PlayCircle className="w-3.5 h-3.5" />재개
            </Button>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { icon: Eye, color: "blue", label: "총 노출", value: campaign.impressions.toLocaleString("ko-KR") },
          { icon: MousePointerClick, color: "emerald", label: "총 클릭", value: campaign.clicks.toLocaleString("ko-KR") },
          { icon: ShoppingCart, color: "amber", label: "총 전환", value: campaign.conversions.toLocaleString("ko-KR") },
          { icon: TrendingUp, color: "violet", label: "CTR", value: `${campaign.ctr}%` },
        ].map(({ icon: Icon, color, label, value }) => (
          <Card key={label} className="border border-gray-200 shadow-sm">
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center gap-3">
                <div className={`p-2 bg-${color}-100 rounded-lg`}>
                  <Icon className={`w-5 h-5 text-${color}-600`} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">{label}</p>
                  <p className="text-xl font-bold text-gray-900">{value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-6 mb-6">
        <Card className="col-span-2 border border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-gray-700">예산 현황</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="pt-4">
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-gray-500">집행 금액</span>
              <span className="font-semibold text-gray-900">{formatKRW(campaign.spent)}</span>
            </div>
            <div className="flex justify-between text-sm mb-3">
              <span className="text-gray-500">총 예산</span>
              <span className="font-semibold text-gray-900">{formatKRW(campaign.budget)}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div
                className={`h-3 rounded-full transition-all ${budgetRatio >= 90 ? "bg-red-500" : budgetRatio >= 60 ? "bg-amber-500" : "bg-violet-500"}`}
                style={{ width: `${Math.min(budgetRatio, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{budgetRatio.toFixed(1)}% 집행</span>
              <span>잔여 {formatKRW(campaign.budget - campaign.spent)}</span>
            </div>
            <Separator className="my-4" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">일평균 소진</span>
                <span className="font-medium text-gray-700">{formatKRW(dailyBurn)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">소진 예상</span>
                <span className="font-medium text-gray-700">
                  {dailyBurn > 0 ? `약 ${Math.ceil((campaign.budget - campaign.spent) / dailyBurn)}일 후` : "—"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 border border-gray-200 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
              <BarChart2 className="w-4 h-4" />최근 7일 노출 추이
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="pt-2">
            <BarChart data={MOCK_CHART_DATA} />
          </CardContent>
        </Card>
      </div>

      <Card className="border border-gray-200 shadow-sm">
        <div className="flex border-b border-gray-200 px-6 pt-1">
          {(["creatives", "media"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-1.5 px-3 py-3 text-sm font-medium border-b-2 transition-colors -mb-px ${tab !== "creatives" ? "ml-2" : ""} ${activeTab === tab ? "border-violet-600 text-violet-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}
            >
              {tab === "creatives" ? <><ImageIcon className="w-4 h-4" />집행 소재</> : <><Newspaper className="w-4 h-4" />매체별 실적</>}
            </button>
          ))}
        </div>

        {activeTab === "creatives" && (
          <CardContent className="pt-6 pb-6">
            {creative ? (
              <div className="flex gap-6">
                <div className="w-40 h-40 bg-gray-100 rounded-xl border flex items-center justify-center flex-shrink-0">
                  <ImageIcon className="w-8 h-8 text-gray-300" />
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">{creative.name}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">업로드: {formatDate(creative.uploadedAt)}</p>
                  </div>
                  {creative.hookCopy && (
                    <div className="bg-gray-50 border rounded-lg p-3">
                      <p className="text-xs text-gray-500 font-medium mb-1">훅 카피</p>
                      <p className="text-sm text-gray-800 italic">"{creative.hookCopy}"</p>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {creative.sizes.map((size) => (
                      <span key={size} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded border">{size}</span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <ImageIcon className="w-10 h-10 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">등록된 소재가 없습니다</p>
              </div>
            )}
          </CardContent>
        )}

        {activeTab === "media" && (
          <CardContent className="pt-0 pb-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  {["매체", "노출", "클릭", "CTR", "집행금액"].map((h, i) => (
                    <th key={h} className={`${i === 0 ? "text-left px-6" : "text-right px-4"} py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MOCK_MEDIA_PERFORMANCE.map((row, i) => (
                  <tr key={row.name} className={`hover:bg-gray-50 ${i < MOCK_MEDIA_PERFORMANCE.length - 1 ? "border-b border-gray-100" : ""}`}>
                    <td className="px-6 py-4 font-medium text-gray-900">{row.name}</td>
                    <td className="px-4 py-4 text-right text-gray-700">{row.impressions.toLocaleString("ko-KR")}</td>
                    <td className="px-4 py-4 text-right text-gray-700">{row.clicks.toLocaleString("ko-KR")}</td>
                    <td className="px-4 py-4 text-right font-semibold text-gray-900">{row.ctr}%</td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900">{formatKRW(row.spend)}</td>
                  </tr>
                ))}
                <tr className="border-t border-gray-200 bg-gray-50">
                  <td className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">합계</td>
                  <td className="px-4 py-3 text-right text-xs font-semibold">{MOCK_MEDIA_PERFORMANCE.reduce((s, r) => s + r.impressions, 0).toLocaleString("ko-KR")}</td>
                  <td className="px-4 py-3 text-right text-xs font-semibold">{MOCK_MEDIA_PERFORMANCE.reduce((s, r) => s + r.clicks, 0).toLocaleString("ko-KR")}</td>
                  <td className="px-4 py-3 text-right text-xs font-semibold">{(MOCK_MEDIA_PERFORMANCE.reduce((s, r) => s + r.ctr, 0) / MOCK_MEDIA_PERFORMANCE.length).toFixed(2)}%</td>
                  <td className="px-6 py-3 text-right text-xs font-semibold">{formatKRW(MOCK_MEDIA_PERFORMANCE.reduce((s, r) => s + r.spend, 0))}</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
