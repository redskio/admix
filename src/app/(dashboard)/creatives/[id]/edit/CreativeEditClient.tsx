"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { mockCreatives, adSizes } from "@/lib/mock-data"
import { ImageIcon, Save, X, ChevronLeft, CheckCircle2, Loader2 } from "lucide-react"

const gradients = [
  "from-violet-400 via-purple-500 to-pink-500",
  "from-blue-400 via-cyan-500 to-teal-500",
  "from-rose-400 via-pink-500 to-fuchsia-500",
  "from-amber-400 via-orange-500 to-rose-500",
]

const statusConfig: Record<string, { label: string; className: string }> = {
  approved: { label: "승인됨", className: "bg-green-100 text-green-700 border-green-200" },
  pending: { label: "검토중", className: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  rejected: { label: "거절됨", className: "bg-red-100 text-red-700 border-red-200" },
}

export default function CreativeEditClient({ id }: { id: string }) {
  const router = useRouter()
  const creative = mockCreatives.find((c) => c.id === id)
  const creativeIndex = mockCreatives.findIndex((c) => c.id === id)
  const gradient = gradients[creativeIndex % gradients.length]

  const [name, setName] = useState(creative?.name ?? "")
  const [hookCopy, setHookCopy] = useState(creative?.hookCopy ?? "")
  const [selectedSizes, setSelectedSizes] = useState<string[]>(() => {
    if (!creative) return []
    return adSizes
      .filter((size) => creative.sizes.includes(`${size.width}x${size.height}`))
      .map((size) => size.id)
  })
  const [isSaving, setIsSaving] = useState(false)

  if (!creative) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-64 gap-4">
        <X className="w-12 h-12 text-gray-300" />
        <p className="text-gray-500 font-medium">소재를 찾을 수 없습니다</p>
        <Button variant="outline" onClick={() => router.push("/creatives")}>소재 목록으로</Button>
      </div>
    )
  }

  const status = statusConfig[creative.status] ?? statusConfig.pending

  function toggleSize(id: string) {
    setSelectedSizes((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id])
  }

  async function handleSave() {
    setIsSaving(true)
    await new Promise((res) => setTimeout(res, 800))
    router.push("/creatives")
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => router.push("/creatives")}
          className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">소재 편집</h1>
          <p className="text-sm text-gray-500 mt-0.5">업로드된 소재의 정보를 수정합니다</p>
        </div>
        <Badge className={`ml-auto shrink-0 text-xs px-2.5 py-1 border font-medium ${status.className}`} variant="outline">
          {status.label}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <Card className="border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-gray-800">기본 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">소재명</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="소재 이름" className="focus-visible:ring-violet-400" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hookCopy" className="text-sm font-medium text-gray-700">후킹 문구</Label>
                <textarea
                  id="hookCopy"
                  value={hookCopy}
                  onChange={(e) => setHookCopy(e.target.value)}
                  placeholder="광고 후킹 문구"
                  rows={4}
                  className="w-full text-sm border border-input rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-400 resize-none bg-background"
                />
                <p className="text-xs text-gray-400">{hookCopy.length}자</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-gray-800">
                사이즈 설정 <span className="text-sm font-normal text-gray-500 ml-1">({selectedSizes.length}개 선택됨)</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {adSizes.map((size) => {
                  const isSelected = selectedSizes.includes(size.id)
                  return (
                    <div
                      key={size.id}
                      onClick={() => toggleSize(size.id)}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${isSelected ? "border-violet-500 bg-violet-50" : "border-gray-200 hover:border-gray-300"}`}
                    >
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${isSelected ? "border-violet-500 bg-violet-500" : "border-gray-300 bg-white"}`}>
                        {isSelected && <CheckCircle2 className="w-3 h-3 text-white" />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-800">{size.platform}</p>
                        <p className="text-xs text-gray-500 truncate">{size.label}</p>
                        <p className="text-xs font-mono text-gray-400">{size.width}×{size.height}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-between pt-2">
            <Button variant="outline" onClick={() => router.back()} className="gap-2 text-gray-600">
              <X className="w-4 h-4" />취소
            </Button>
            <Button onClick={handleSave} disabled={isSaving || !name.trim()} className="bg-violet-600 hover:bg-violet-700 text-white gap-2 px-6">
              {isSaving ? <><Loader2 className="w-4 h-4 animate-spin" />저장 중...</> : <><Save className="w-4 h-4" />저장</>}
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <Card className="border-gray-200 overflow-hidden">
            <div className={`h-48 bg-gradient-to-br ${gradient} flex flex-col items-center justify-center relative`}>
              <ImageIcon className="w-12 h-12 text-white/70 mb-2" />
              <span className="text-white/80 text-sm font-medium">소재 이미지</span>
            </div>
            <CardContent className="p-4">
              <p className="text-xs text-gray-400 mb-1">업로드 날짜</p>
              <p className="text-sm text-gray-700 font-medium">{creative.uploadedAt}</p>
              <Separator className="my-3" />
              <p className="text-xs text-gray-400 mb-1">사용 캠페인</p>
              <p className="text-sm text-gray-700 font-medium">{creative.usedInCampaigns}개</p>
              {hookCopy && (
                <>
                  <Separator className="my-3" />
                  <p className="text-xs text-gray-400 mb-1.5">후킹 문구 미리보기</p>
                  <div className={`rounded-lg bg-gradient-to-br ${gradient} p-3`}>
                    <p className="text-white text-xs italic font-medium text-center leading-relaxed drop-shadow">&ldquo;{hookCopy}&rdquo;</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          {selectedSizes.length > 0 && (
            <Card className="border-gray-200">
              <CardContent className="p-4">
                <p className="text-xs text-gray-400 mb-2.5 font-medium uppercase tracking-wide">선택된 사이즈</p>
                <div className="flex flex-wrap gap-1.5">
                  {adSizes.filter((s) => selectedSizes.includes(s.id)).map((s) => (
                    <Badge key={s.id} variant="outline" className="text-xs text-violet-700 border-violet-200 bg-violet-50">
                      {s.width}×{s.height}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
