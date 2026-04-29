import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Building2, TrendingUp, Eye, Layers } from "lucide-react"

const mockPublisherMedia = [
  {
    id: "media_001",
    name: "맘카페",
    vertical: "육아/생활",
    status: "active",
    monthlyRevenue: 620000,
    impressions: 2100000,
  },
  {
    id: "media_002",
    name: "인벤",
    vertical: "게임/IT",
    status: "active",
    monthlyRevenue: 480000,
    impressions: 1890000,
  },
  {
    id: "media_003",
    name: "82cook",
    vertical: "생활/레시피",
    status: "pending",
    monthlyRevenue: 140000,
    impressions: 531000,
  },
]

const statusLabel: Record<string, string> = {
  active: "활성",
  pending: "승인 대기",
  inactive: "비활성",
}

const statusVariant: Record<string, "default" | "secondary" | "outline"> = {
  active: "default",
  pending: "secondary",
  inactive: "outline",
}

export default function PublisherDashboardPage() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">매체사 대시보드</h1>
        <p className="text-sm text-gray-500 mt-1">등록된 매체의 수익과 성과를 확인하세요</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">등록 매체</p>
              <p className="text-2xl font-bold text-gray-900 mt-0.5">3<span className="text-base font-normal text-gray-400 ml-1">개</span></p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">이번달 수익</p>
              <p className="text-2xl font-bold text-emerald-600 mt-0.5">₩1,240,000</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Eye className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">노출 수</p>
              <p className="text-2xl font-bold text-gray-900 mt-0.5">4,521,000</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
              <Layers className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">활성 지면</p>
              <p className="text-2xl font-bold text-gray-900 mt-0.5">12<span className="text-base font-normal text-gray-400 ml-1">개</span></p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Media Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold text-gray-800">등록 매체 현황</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 font-medium text-gray-500">매체명</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">카테고리</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500">상태</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-500">이번달 수익</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-500">노출 수</th>
                </tr>
              </thead>
              <tbody>
                {mockPublisherMedia.map((m) => (
                  <tr key={m.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-medium text-gray-900">{m.name}</td>
                    <td className="py-3 px-4 text-gray-500">{m.vertical}</td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant={statusVariant[m.status] ?? "outline"}>
                        {statusLabel[m.status] ?? m.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-emerald-600">
                      ₩{m.monthlyRevenue.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right text-gray-600">
                      {m.impressions.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-semibold text-gray-700 mb-3">빠른 실행</h2>
        <div className="flex gap-3">
          <Link
            href="/publisher/media"
            className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium bg-violet-600 text-white hover:bg-violet-700 transition-colors"
          >
            새 매체 등록
          </Link>
          <Link
            href="/publisher/media"
            className="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
          >
            지면 추가
          </Link>
        </div>
      </div>
    </div>
  )
}
