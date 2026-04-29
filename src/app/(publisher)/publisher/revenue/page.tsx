"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, TrendingDown } from "lucide-react"

const revenueData = [
  { month: "11월", revenue: 540000 },
  { month: "12월", revenue: 720000 },
  { month: "1월", revenue: 680000 },
  { month: "2월", revenue: 830000 },
  { month: "3월", revenue: 980000 },
  { month: "4월", revenue: 1240000 },
]

const monthlyTable = [
  { month: "2025년 11월", impressions: 1820000, clicks: 52400, revenue: 540000 },
  { month: "2025년 12월", impressions: 2340000, clicks: 71200, revenue: 720000 },
  { month: "2026년 1월", impressions: 2210000, clicks: 68500, revenue: 680000 },
  { month: "2026년 2월", impressions: 2690000, clicks: 83100, revenue: 830000 },
  { month: "2026년 3월", impressions: 3180000, clicks: 96400, revenue: 980000 },
  { month: "2026년 4월", impressions: 4521000, clicks: 124300, revenue: 1240000 },
]

const thisMonth = 1240000
const lastMonth = 980000
const growthRate = (((thisMonth - lastMonth) / lastMonth) * 100).toFixed(1)
const isGrowthPositive = thisMonth >= lastMonth

export default function PublisherRevenuePage() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">수익 리포트</h1>
        <p className="text-sm text-gray-500 mt-1">매체별 광고 수익 현황을 확인하세요</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500 mb-1">이번달 수익</p>
            <p className="text-3xl font-bold text-emerald-600">
              ₩{thisMonth.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500 mb-1">지난달 수익</p>
            <p className="text-3xl font-bold text-gray-700">
              ₩{lastMonth.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-500 mb-1">성장률</p>
            <div className="flex items-center gap-2">
              <p className={`text-3xl font-bold ${isGrowthPositive ? "text-emerald-600" : "text-red-500"}`}>
                {isGrowthPositive ? "+" : ""}{growthRate}%
              </p>
              {isGrowthPositive ? (
                <TrendingUp className="w-6 h-6 text-emerald-500" />
              ) : (
                <TrendingDown className="w-6 h-6 text-red-500" />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold text-gray-800">월별 수익 추이</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={revenueData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis
                tick={{ fontSize: 12 }}
                tickFormatter={(v: number) => `₩${(v / 10000).toFixed(0)}만`}
              />
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <Tooltip formatter={(value: any) => [`₩${Number(value).toLocaleString()}`, "수익"]} />
              <Bar
                dataKey="revenue"
                name="수익"
                fill="#7c3aed"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Monthly Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold text-gray-800">월별 상세 내역</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 font-medium text-gray-500">월</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-500">노출</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-500">클릭</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-500">수익</th>
                </tr>
              </thead>
              <tbody>
                {monthlyTable.map((row, idx) => (
                  <tr
                    key={row.month}
                    className={`border-b border-gray-50 hover:bg-gray-50 transition-colors ${idx === monthlyTable.length - 1 ? "font-semibold" : ""}`}
                  >
                    <td className="py-3 px-4 text-gray-900">{row.month}</td>
                    <td className="py-3 px-4 text-right text-gray-600">
                      {row.impressions.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right text-gray-600">
                      {row.clicks.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right text-emerald-600">
                      ₩{row.revenue.toLocaleString()}
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
