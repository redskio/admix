import { mockCreatives, adSizes } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ImageIcon, Plus } from "lucide-react"

const statusConfig: Record<string, { label: string; className: string }> = {
  approved: { label: "승인됨", className: "bg-green-100 text-green-700 border-green-200" },
  pending: { label: "검토중", className: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  rejected: { label: "거절됨", className: "bg-red-100 text-red-700 border-red-200" },
}

const gradients = [
  "from-violet-400 to-purple-600",
  "from-blue-400 to-cyan-600",
  "from-rose-400 to-pink-600",
  "from-amber-400 to-orange-600",
]

export default function CreativesPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">소재 관리</h1>
          <p className="text-sm text-gray-500 mt-1">광고 소재를 관리하고 새 소재를 업로드하세요</p>
        </div>
        <Link href="/creatives/upload">
          <Button className="bg-violet-600 hover:bg-violet-700 text-white gap-2">
            <Plus className="w-4 h-4" />
            새 소재 업로드
          </Button>
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockCreatives.map((creative, index) => {
          const status = statusConfig[creative.status] ?? statusConfig.pending
          const gradient = gradients[index % gradients.length]

          return (
            <Card key={creative.id} className="overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
              {/* Image Placeholder */}
              <div className={`relative h-48 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                <div className="flex flex-col items-center gap-2 text-white/80">
                  <ImageIcon className="w-12 h-12" />
                  <span className="text-sm font-medium">이미지 미리보기</span>
                </div>
              </div>

              <CardContent className="p-4">
                {/* Name + Status */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm leading-tight">{creative.name}</h3>
                  <Badge
                    className={`shrink-0 text-xs px-2 py-0.5 border font-medium ${status.className}`}
                    variant="outline"
                  >
                    {status.label}
                  </Badge>
                </div>

                {/* Hook Copy */}
                {creative.hookCopy ? (
                  <p className="text-xs text-gray-500 italic mb-3 line-clamp-2">
                    &ldquo;{creative.hookCopy}&rdquo;
                  </p>
                ) : (
                  <p className="text-xs text-gray-400 italic mb-3">후킹 문구 없음</p>
                )}

                {/* Sizes */}
                {creative.sizes.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {creative.sizes.map((size) => (
                      <span
                        key={size}
                        className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-gray-100 text-gray-600 border border-gray-200"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-xs text-gray-500">
                    사용 캠페인: {creative.usedInCampaigns}개
                  </span>
                  <Link href={`/creatives/${creative.id}/edit`}>
                    <Button variant="outline" size="sm" className="text-xs h-7 px-3">
                      편집
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
