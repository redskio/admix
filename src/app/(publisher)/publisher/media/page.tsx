"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus, X, Globe, Users, Tag } from "lucide-react"

interface Media {
  id: string
  name: string
  url: string
  vertical: string
  monthlyUV: number
  status: "active" | "pending" | "inactive"
  adFormats: string[]
}

const initialMedia: Media[] = [
  {
    id: "media_001",
    name: "맘카페",
    url: "https://cafe.naver.com/imsanbu",
    vertical: "육아/생활",
    monthlyUV: 4500000,
    status: "active",
    adFormats: ["배너 300x250", "배너 728x90", "피드 1080x1080"],
  },
  {
    id: "media_002",
    name: "인벤",
    url: "https://www.inven.co.kr",
    vertical: "게임/IT",
    monthlyUV: 8200000,
    status: "active",
    adFormats: ["배너 728x90", "배너 300x600", "스킨"],
  },
  {
    id: "media_003",
    name: "82cook",
    url: "https://www.82cook.com",
    vertical: "생활/레시피",
    monthlyUV: 3100000,
    status: "pending",
    adFormats: ["배너 300x250", "네이티브"],
  },
]

const VERTICALS = ["육아/생활", "게임/IT", "생활/레시피", "패션/뷰티", "스포츠/피트니스", "금융/재테크", "기타"]

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

export default function PublisherMediaPage() {
  const [mediaList, setMediaList] = useState<Media[]>(initialMedia)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [form, setForm] = useState({
    name: "",
    url: "",
    vertical: VERTICALS[0],
    monthlyUV: "",
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || !form.url.trim()) return

    const newMedia: Media = {
      id: `media_${Date.now()}`,
      name: form.name,
      url: form.url,
      vertical: form.vertical,
      monthlyUV: parseInt(form.monthlyUV.replace(/,/g, "")) || 0,
      status: "pending",
      adFormats: [],
    }
    setMediaList((prev) => [...prev, newMedia])
    setForm({ name: "", url: "", vertical: VERTICALS[0], monthlyUV: "" })
    setIsFormOpen(false)
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">매체 관리</h1>
          <p className="text-sm text-gray-500 mt-1">등록된 매체를 관리하고 새 매체를 추가하세요</p>
        </div>
        <Button
          className="bg-violet-600 hover:bg-violet-700 gap-2"
          onClick={() => setIsFormOpen((v) => !v)}
        >
          {isFormOpen ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {isFormOpen ? "취소" : "새 매체 등록"}
        </Button>
      </div>

      {/* Registration Form */}
      {isFormOpen && (
        <Card className="border-violet-200 bg-violet-50/40">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-violet-800">새 매체 등록</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">매체명 *</label>
                <input
                  type="text"
                  required
                  placeholder="예: 맘카페"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://example.com"
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">버티컬 카테고리</label>
                <select
                  value={form.vertical}
                  onChange={(e) => setForm({ ...form, vertical: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 bg-white"
                >
                  {VERTICALS.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">월 UV (방문자수)</label>
                <input
                  type="text"
                  placeholder="예: 1000000"
                  value={form.monthlyUV}
                  onChange={(e) => setForm({ ...form, monthlyUV: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 bg-white"
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                  취소
                </Button>
                <Button type="submit" className="bg-violet-600 hover:bg-violet-700">
                  등록 신청
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Separator />

      {/* Media Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {mediaList.map((media) => (
          <Card key={media.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 space-y-4">
              {/* Top row */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 text-base">{media.name}</h3>
                  <a
                    href={media.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-400 hover:text-violet-600 flex items-center gap-1 mt-0.5"
                  >
                    <Globe className="w-3 h-3" />
                    {media.url.replace(/^https?:\/\//, "")}
                  </a>
                </div>
                <Badge variant={statusVariant[media.status] ?? "outline"}>
                  {statusLabel[media.status] ?? media.status}
                </Badge>
              </div>

              {/* Stats */}
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Tag className="w-3.5 h-3.5" />
                  {media.vertical}
                </div>
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Users className="w-3.5 h-3.5" />
                  {(media.monthlyUV / 10000).toFixed(0)}만 UV/월
                </div>
              </div>

              {/* Ad Formats */}
              {media.adFormats.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {media.adFormats.map((fmt) => (
                    <span
                      key={fmt}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                    >
                      {fmt}
                    </span>
                  ))}
                </div>
              )}

              {/* Edit Button */}
              <div className="pt-1">
                <Button variant="outline" size="sm" className="w-full text-xs">
                  편집
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
