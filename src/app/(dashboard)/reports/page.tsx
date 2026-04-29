"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { mockCampaigns } from "@/lib/mock-data"

const dailyData = [
  { date: "4/23", impressions: 38200, clicks: 1180 },
  { date: "4/24", impressions: 41500, clicks: 1330 },
  { date: "4/25", impressions: 36800, clicks: 1050 },
  { date: "4/26", impressions: 44200, clicks: 1420 },
  { date: "4/27", impressions: 52100, clicks: 1680 },
  { date: "4/28", impressions: 39600, clicks: 1260 },
  { date: "4/29", impressions: 47800, clicks: 1510 },
]

const mediaData = [
  { name: "맘카페", impressions: 168300, clicks: 5240, ctr: 3.11 },
  { name: "인벤", impressions: 116200, clicks: 3680, ctr: 3.17 },
  { name: "82cook", impressions: 43000, clicks: 1200, ctr: 2.79 },
]

const campaignBudget = [
  { name: "무신사 봄 신상", value: 1340000, fill: "#7c3aed" },
  { name: "게임 아이템", value: 198000, fill: "#059669" },
  { name: "유아용품", value: 623000, fill: "#d97706" },
]

const DATE_RANGES = ["최근 7일", "최근 30일", "최근 90일"]

const statusLabel: Record<string, string> = {
  active: "진행중",
  paused: "일시정지",
  draft: "초안",
  ended: "종료",
}

const statusVariant: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  active: "default",
  paused: "secondary",
  draft: "outline",
  ended: "destructive",
}

export default function ReportsPage() {
  const [selectedRange, setSelectedRange] = useState("최근 7일")

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">리포트 &amp; 분석</h1>
          <p className="text-sm text-gray-500 mt-1">캠페인 성과를 한눈에 확인하세요</p>
        </div>
        <div className="flex gap-2">
          {DATE_RANGES.map((range) => (
            <Button
              key={range}
              variant={selectedRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedRange(range)}
              className={selectedRange === range ? "bg-violet-600 hover:bg-violet-700" : ""}
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "총 노출", value: "284,500", unit: "회", color: "text-violet-600" },
          { label: "총 클릭", value: "8,920", unit: "회", color: "text-emerald-600" },
          { label: "평균 CTR", value: "3.13", unit: "%", color: "text-blue-600" },
          { label: "총 전환", value: "312", unit: "건", color: "text-amber-600" },
        ].map(({ label, value, unit, color }) => (
          <Card key={label}>
            <CardContent className="p-6">
              <p className="text-sm text-gray-500 mb-1">{label}</p>
              <p className={`text-3xl font-bold ${color}`}>
                {value}
                <span className="text-base font-normal text-gray-400 ml-1">{unit}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart 1 — 일별 노출/클릭 추이 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold text-gray-800">일별 노출 / 클릭 추이</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="impressions"
                name="노출"
                stroke="#7c3aed"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="clicks"
                name="클릭"
                stroke="#059669"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Chart 2 & 3 — side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 2 — 매체별 성과 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-800">매체별 성과</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={mediaData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="impressions" name="노출" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                <Bar dataKey="clicks" name="클릭" fill="#059669" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Chart 3 — 캠페인별 예산 소진 현황 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-800">캠페인별 예산 소진 현황</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={campaignBudget}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  nameKey="name"
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  label={({ name, percent }: any) =>
                    `${name ?? ""} ${(((percent as number) ?? 0) * 100).toFixed(0)}%`
                  }
                  labelLine={true}
                >
                  {campaignBudget.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <Tooltip formatter={(value: any) => `₩${Number(value).toLocaleString()}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold text-gray-800">캠페인별 성과 요약</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 font-medium text-gray-500">캠페인명</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-500">노출</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-500">클릭</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-500">CTR</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-500">소진 예산</th>
                  <th className="text-center py-3 px-4 font-medium text-gray-500">상태</th>
                </tr>
              </thead>
              <tbody>
                {mockCampaigns.map((c) => (
                  <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-medium text-gray-900">{c.name}</td>
                    <td className="py-3 px-4 text-right text-gray-600">{c.impressions.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right text-gray-600">{c.clicks.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right text-gray-600">{c.ctr.toFixed(2)}%</td>
                    <td className="py-3 px-4 text-right text-gray-600">₩{c.spent.toLocaleString()}</td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant={statusVariant[c.status] ?? "outline"}>
                        {statusLabel[c.status] ?? c.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
