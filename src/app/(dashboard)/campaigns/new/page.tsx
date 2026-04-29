"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { mockMedia } from "@/lib/mock-data"
import {
  ChevronRight,
  ChevronLeft,
  Target,
  Wallet,
  CheckCircle2,
  Building2,
  Users,
  TrendingUp,
} from "lucide-react"

const CATEGORIES = [
  "패션/뷰티",
  "게임/IT",
  "육아/생활",
  "음식/레스토랑",
  "스포츠/아웃도어",
]

type CampaignType = "vertical" | "budget_drain"

interface FormData {
  name: string
  type: CampaignType
  category: string
  budget: string
  startDate: string
  endDate: string
}

const DEFAULT_FORM: FormData = {
  name: "",
  type: "vertical",
  category: "패션/뷰티",
  budget: "",
  startDate: "",
  endDate: "",
}

function formatUV(uv: number): string {
  if (uv >= 1000000) return `${(uv / 1000000).toFixed(1)}M`
  if (uv >= 10000) return `${(uv / 10000).toFixed(0)}만`
  return uv.toLocaleString("ko-KR")
}

function formatKRW(amount: number): string {
  return `₩${amount.toLocaleString("ko-KR")}`
}

export default function NewCampaignPage() {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2>(1)
  const [form, setForm] = useState<FormData>(DEFAULT_FORM)
  const [selectedMedia, setSelectedMedia] = useState<string[]>([])

  function updateForm(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function toggleMedia(id: string) {
    setSelectedMedia((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    )
  }

  function handleNext() {
    setStep(2)
  }

  function handleSubmit() {
    router.push("/campaigns")
  }

  const step1Valid = form.name.trim().length > 0 && form.budget.trim().length > 0 && form.startDate && form.endDate

  return (
    <div className="p-8 max-w-3xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">새 캠페인 만들기</h1>
        <p className="text-sm text-gray-500 mt-1">
          광고 캠페인 기본 정보를 입력하고 매체를 선택하세요
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-3 mb-8">
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
          step >= 1 ? "bg-violet-100 text-violet-700" : "bg-gray-100 text-gray-500"
        }`}>
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
            step > 1 ? "bg-violet-600 text-white" : step === 1 ? "bg-violet-600 text-white" : "bg-gray-300 text-gray-600"
          }`}>
            {step > 1 ? <CheckCircle2 className="w-3 h-3" /> : "1"}
          </span>
          기본 정보
        </div>

        <div className="flex-1 h-px bg-gray-200" />

        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
          step >= 2 ? "bg-violet-100 text-violet-700" : "bg-gray-100 text-gray-500"
        }`}>
          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
            step >= 2 ? "bg-violet-600 text-white" : "bg-gray-300 text-gray-600"
          }`}>
            2
          </span>
          매체 선택
        </div>
      </div>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <div className="space-y-6">
          {/* Campaign Name */}
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              캠페인명 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="예) 무신사 봄 신상 프로모션"
              value={form.name}
              onChange={(e) => updateForm("name", e.target.value)}
              className="h-10 border-gray-200 focus:border-violet-500 focus:ring-violet-500"
            />
          </div>

          {/* Campaign Type */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              집행 유형 <span className="text-red-500">*</span>
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {/* Vertical */}
              <button
                type="button"
                onClick={() => updateForm("type", "vertical")}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  form.type === "vertical"
                    ? "border-violet-500 bg-violet-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${form.type === "vertical" ? "bg-violet-100" : "bg-gray-100"}`}>
                    <Target className={`w-4 h-4 ${form.type === "vertical" ? "text-violet-600" : "text-gray-500"}`} />
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${form.type === "vertical" ? "text-violet-700" : "text-gray-700"}`}>
                      버티컬형
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                      특정 매체/버티컬을 직접 타겟해 집행
                    </p>
                  </div>
                </div>
                {form.type === "vertical" && (
                  <div className="mt-2 flex justify-end">
                    <CheckCircle2 className="w-4 h-4 text-violet-600" />
                  </div>
                )}
              </button>

              {/* Budget Drain */}
              <button
                type="button"
                onClick={() => updateForm("type", "budget_drain")}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  form.type === "budget_drain"
                    ? "border-violet-500 bg-violet-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${form.type === "budget_drain" ? "bg-violet-100" : "bg-gray-100"}`}>
                    <Wallet className={`w-4 h-4 ${form.type === "budget_drain" ? "text-violet-600" : "text-gray-500"}`} />
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${form.type === "budget_drain" ? "text-violet-700" : "text-gray-700"}`}>
                      예산소진형
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                      설정 예산을 전량 소진할 때까지 집행
                    </p>
                  </div>
                </div>
                {form.type === "budget_drain" && (
                  <div className="mt-2 flex justify-end">
                    <CheckCircle2 className="w-4 h-4 text-violet-600" />
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <Label htmlFor="category" className="text-sm font-medium text-gray-700">
              카테고리 <span className="text-red-500">*</span>
            </Label>
            <select
              id="category"
              value={form.category}
              onChange={(e) => updateForm("category", e.target.value)}
              className="w-full h-10 px-3 rounded-md border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Budget */}
          <div className="space-y-1.5">
            <Label htmlFor="budget" className="text-sm font-medium text-gray-700">
              총 예산 (원) <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">₩</span>
              <Input
                id="budget"
                type="number"
                placeholder="1000000"
                value={form.budget}
                onChange={(e) => updateForm("budget", e.target.value)}
                className="h-10 pl-7 border-gray-200 focus:border-violet-500 focus:ring-violet-500"
              />
            </div>
            {form.budget && (
              <p className="text-xs text-gray-500">
                {Number(form.budget).toLocaleString("ko-KR")}원
              </p>
            )}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="startDate" className="text-sm font-medium text-gray-700">
                시작일 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="startDate"
                type="date"
                value={form.startDate}
                onChange={(e) => updateForm("startDate", e.target.value)}
                className="h-10 border-gray-200 focus:border-violet-500 focus:ring-violet-500"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="endDate" className="text-sm font-medium text-gray-700">
                종료일 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="endDate"
                type="date"
                value={form.endDate}
                onChange={(e) => updateForm("endDate", e.target.value)}
                className="h-10 border-gray-200 focus:border-violet-500 focus:ring-violet-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              onClick={handleNext}
              disabled={!step1Valid}
              className="bg-violet-600 hover:bg-violet-700 text-white gap-2 disabled:opacity-50"
            >
              다음
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Media Selection */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-500">
              캠페인을 집행할 매체를 선택하세요. 여러 개 선택 가능합니다.
            </p>
          </div>

          <div className="space-y-3">
            {mockMedia.map((media) => {
              const isSelected = selectedMedia.includes(media.id)
              return (
                <button
                  key={media.id}
                  type="button"
                  onClick={() => toggleMedia(media.id)}
                  className={`w-full text-left p-5 rounded-xl border-2 transition-all ${
                    isSelected
                      ? "border-violet-500 bg-violet-50"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className={`text-sm font-semibold ${isSelected ? "text-violet-700" : "text-gray-900"}`}>
                          {media.name}
                        </h3>
                        <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full border border-gray-200">
                          {media.vertical}
                        </span>
                        {/* Match Score */}
                        <span className={`px-1.5 py-0.5 text-xs rounded-full font-medium ${
                          media.matchScore >= 0.9
                            ? "bg-green-100 text-green-700 border border-green-200"
                            : media.matchScore >= 0.8
                            ? "bg-blue-100 text-blue-700 border border-blue-200"
                            : "bg-gray-100 text-gray-600 border border-gray-200"
                        }`}>
                          매치 {Math.round(media.matchScore * 100)}%
                        </span>
                      </div>
                      <div className="flex items-center gap-5 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          월 UV {formatUV(media.monthlyUV)}
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          최소 {formatKRW(media.minBudget)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Building2 className="w-3 h-3" />
                          {media.adFormats.join(" / ")}
                        </span>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ml-4 mt-0.5 ${
                      isSelected
                        ? "border-violet-600 bg-violet-600"
                        : "border-gray-300"
                    }`}>
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {selectedMedia.length > 0 && (
            <div className="bg-violet-50 border border-violet-200 rounded-lg p-3">
              <p className="text-xs font-medium text-violet-700">
                선택된 매체 {selectedMedia.length}개:{" "}
                {selectedMedia
                  .map((id) => mockMedia.find((m) => m.id === id)?.name)
                  .filter(Boolean)
                  .join(", ")}
              </p>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={() => setStep(1)}
              className="gap-2 border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              <ChevronLeft className="w-4 h-4" />
              이전
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-violet-600 hover:bg-violet-700 text-white gap-2"
            >
              캠페인 생성
              <CheckCircle2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
