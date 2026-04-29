import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { mockCampaigns, mockUser } from "@/lib/mock-data"
import {
  TrendingUp,
  Eye,
  MousePointerClick,
  CreditCard,
  Megaphone,
  UploadCloud,
  PlusCircle,
  Activity,
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
    active: { label: "집행중", className: "bg-green-100 text-green-700 border-green-200" },
    paused: { label: "일시정지", className: "bg-yellow-100 text-yellow-700 border-yellow-200" },
    draft: { label: "초안", className: "bg-gray-100 text-gray-600 border-gray-200" },
  }
  const cfg = map[status] ?? { label: status, className: "bg-gray-100 text-gray-600 border-gray-200" }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${cfg.className}`}>
      {cfg.label}
    </span>
  )
}

export default function DashboardPage() {
  const today = new Date()
  const dateLabel = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`

  const activeCampaigns = mockCampaigns.filter((c) => c.status === "active").length
  const totalImpressions = mockCampaigns.reduce((s, c) => s + c.impressions, 0)
  const totalClicks = mockCampaigns.reduce((s, c) => s + c.clicks, 0)

  const recentCampaigns = mockCampaigns.slice(0, 3)

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            안녕하세요, {mockUser.name}님 👋
          </h1>
          <p className="text-sm text-gray-500 mt-1">{dateLabel}</p>
        </div>
        <Link href="/campaigns/new">
          <Button className="bg-violet-600 hover:bg-violet-700 text-white gap-2">
            <PlusCircle className="w-4 h-4" />
            새 캠페인 만들기
          </Button>
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="pt-5 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-violet-100 rounded-lg">
                <Activity className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">활성 캠페인</p>
                <p className="text-2xl font-bold text-gray-900">{activeCampaigns}개</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="pt-5 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Eye className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">이번달 노출</p>
                <p className="text-2xl font-bold text-gray-900">{totalImpressions.toLocaleString("ko-KR")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="pt-5 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <MousePointerClick className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">이번달 클릭</p>
                <p className="text-2xl font-bold text-gray-900">{totalClicks.toLocaleString("ko-KR")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="pt-5 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <CreditCard className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">잔여 크레딧</p>
                <p className="text-2xl font-bold text-gray-900">{formatKRW(mockUser.credits)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Campaigns Table */}
      <Card className="border border-gray-200 shadow-sm mb-8">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-gray-900">최근 캠페인</CardTitle>
            <Link href="/campaigns">
              <span className="text-xs text-violet-600 hover:text-violet-700 font-medium cursor-pointer">
                전체 보기 →
              </span>
            </Link>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">캠페인명</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">상태</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">예산/집행</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">CTR</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">기간</th>
              </tr>
            </thead>
            <tbody>
              {recentCampaigns.map((campaign, idx) => (
                <tr
                  key={campaign.id}
                  className={`hover:bg-gray-50 transition-colors ${idx < recentCampaigns.length - 1 ? "border-b border-gray-100" : ""}`}
                >
                  <td className="px-6 py-4">
                    <Link href={`/campaigns/${campaign.id}`}>
                      <span className="font-medium text-gray-900 hover:text-violet-600 transition-colors cursor-pointer">
                        {campaign.name}
                      </span>
                    </Link>
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={campaign.status} />
                  </td>
                  <td className="px-4 py-4 text-gray-700 font-mono text-xs">
                    {formatKRW(campaign.spent)}<span className="text-gray-400">/</span>{formatKRW(campaign.budget)}
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-gray-900 font-semibold">{campaign.ctr}%</span>
                  </td>
                  <td className="px-4 py-4 text-gray-500 text-xs">
                    {formatDate(campaign.startDate)} ~ {formatDate(campaign.endDate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="grid grid-cols-2 gap-4">
        <Link href="/creatives/upload">
          <Card className="border border-gray-200 shadow-sm hover:border-violet-300 hover:shadow-md transition-all cursor-pointer group">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-violet-100 rounded-xl group-hover:bg-violet-200 transition-colors">
                  <UploadCloud className="w-6 h-6 text-violet-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">소재 업로드</p>
                  <p className="text-xs text-gray-500 mt-0.5">배너, 피드 소재를 업로드하세요</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/billing">
          <Card className="border border-gray-200 shadow-sm hover:border-violet-300 hover:shadow-md transition-all cursor-pointer group">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-100 rounded-xl group-hover:bg-amber-200 transition-colors">
                  <Megaphone className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">크레딧 충전</p>
                  <p className="text-xs text-gray-500 mt-0.5">캠페인 집행을 위해 크레딧을 충전하세요</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
