"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { mockHookCopies, adSizes } from "@/lib/mock-data"
import {
  Upload,
  CheckCircle2,
  Loader2,
  ImageIcon,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  LayoutGrid,
} from "lucide-react"

const STEPS = [
  { number: 1, label: "이미지 업로드" },
  { number: 2, label: "AI 문구 생성" },
  { number: 3, label: "사이즈 조정" },
  { number: 4, label: "확정 및 저장" },
]

const GRADIENTS = [
  "from-violet-400 via-purple-500 to-pink-500",
  "from-blue-400 via-cyan-500 to-teal-500",
  "from-rose-400 via-pink-500 to-fuchsia-500",
]

export default function CreativeUploadPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedCopy, setSelectedCopy] = useState<string>("")
  const [customCopy, setCustomCopy] = useState<string>("")
  const [useCustomCopy, setUseCustomCopy] = useState(false)
  const [selectedSizes, setSelectedSizes] = useState<string[]>(adSizes.map((s) => s.id))
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [aiReady, setAiReady] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)

  // Step 2: AI analysis timer
  useEffect(() => {
    if (step === 2) {
      setIsAnalyzing(true)
      setAiReady(false)
      const timer = setTimeout(() => {
        setIsAnalyzing(false)
        setAiReady(true)
        setSelectedCopy(mockHookCopies[0])
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [step])

  function handleUploadClick() {
    if (isUploading || uploadedImage) return
    setIsUploading(true)
    setTimeout(() => {
      setUploadedImage("uploaded")
      setIsUploading(false)
    }, 2000)
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDragOver(false)
    if (isUploading || uploadedImage) return
    setIsUploading(true)
    setTimeout(() => {
      setUploadedImage("uploaded")
      setIsUploading(false)
    }, 2000)
  }

  function toggleSize(id: string) {
    setSelectedSizes((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  function toggleAllSizes() {
    if (selectedSizes.length === adSizes.length) {
      setSelectedSizes([])
    } else {
      setSelectedSizes(adSizes.map((s) => s.id))
    }
  }

  async function handleSave() {
    setIsSaving(true)
    await new Promise((res) => setTimeout(res, 1000))
    router.push("/creatives")
  }

  const activeCopy = useCustomCopy ? customCopy : selectedCopy

  return (
    <div className="p-8 max-w-3xl mx-auto">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">새 소재 업로드</h1>
        <p className="text-sm text-gray-500 mt-1">AI가 최적의 광고 소재를 자동으로 구성해드립니다</p>
      </div>

      {/* Step Progress Indicator */}
      <div className="flex items-center justify-between mb-10">
        {STEPS.map((s, idx) => (
          <div key={s.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                  step === s.number
                    ? "bg-violet-600 border-violet-600 text-white shadow-lg shadow-violet-200"
                    : step > s.number
                    ? "bg-violet-600 border-violet-600 text-white"
                    : "bg-white border-gray-300 text-gray-400"
                }`}
              >
                {step > s.number ? <CheckCircle2 className="w-5 h-5" /> : s.number}
              </div>
              <span
                className={`text-xs font-medium whitespace-nowrap ${
                  step === s.number ? "text-violet-600" : step > s.number ? "text-violet-500" : "text-gray-400"
                }`}
              >
                {s.label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 mb-5 rounded transition-all ${
                  step > s.number ? "bg-violet-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* ─── STEP 1: 이미지 업로드 ─── */}
      {step === 1 && (
        <div className="space-y-6">
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5 text-violet-600" />
                이미지 업로드
              </h2>

              {!uploadedImage && !isUploading && (
                <div
                  onClick={handleUploadClick}
                  onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center cursor-pointer transition-all ${
                    isDragOver
                      ? "border-violet-500 bg-violet-50"
                      : "border-gray-300 hover:border-violet-400 hover:bg-gray-50"
                  }`}
                >
                  <div className="w-16 h-16 rounded-full bg-violet-50 flex items-center justify-center mb-4">
                    <Upload className="w-8 h-8 text-violet-500" />
                  </div>
                  <p className="text-gray-700 font-medium mb-1">이미지를 드래그하거나 클릭하여 업로드</p>
                  <p className="text-sm text-gray-400">JPG, PNG, GIF / 최대 10MB</p>
                </div>
              )}

              {isUploading && (
                <div className="border-2 border-dashed border-violet-400 rounded-xl p-12 flex flex-col items-center justify-center bg-violet-50">
                  <Loader2 className="w-10 h-10 text-violet-500 animate-spin mb-3" />
                  <p className="text-violet-700 font-medium">업로드 중...</p>
                </div>
              )}

              {uploadedImage && !isUploading && (
                <div className="space-y-4">
                  <div className="rounded-xl overflow-hidden h-64 bg-gradient-to-br from-violet-400 via-purple-500 to-pink-500 flex items-center justify-center relative">
                    <div className="flex flex-col items-center gap-2 text-white">
                      <ImageIcon className="w-14 h-14 opacity-80" />
                      <span className="text-sm font-medium opacity-90">업로드된 이미지</span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-green-500 text-white border-0 gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        업로드 완료
                      </Badge>
                    </div>
                  </div>
                  <button
                    onClick={() => setUploadedImage(null)}
                    className="text-xs text-gray-400 hover:text-gray-600 underline"
                  >
                    다른 이미지로 교체
                  </button>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button
              onClick={() => setStep(2)}
              disabled={!uploadedImage}
              className="bg-violet-600 hover:bg-violet-700 text-white gap-2 px-6"
            >
              다음 단계
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* ─── STEP 2: AI 후킹 문구 ─── */}
      {step === 2 && (
        <div className="space-y-6">
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-violet-600" />
                AI 후킹 문구 생성
              </h2>

              {isAnalyzing && (
                <div className="flex flex-col items-center py-12 gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-violet-500 animate-pulse" />
                    </div>
                    <div className="absolute inset-0 rounded-full border-2 border-violet-400 border-t-transparent animate-spin" />
                  </div>
                  <div className="text-center">
                    <p className="text-gray-700 font-medium">AI가 분석 중입니다...</p>
                    <p className="text-sm text-gray-400 mt-1">이미지를 분석해 최적의 문구를 생성하고 있어요</p>
                  </div>
                </div>
              )}

              {aiReady && (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 mb-4">AI가 생성한 후킹 문구 중 하나를 선택하세요</p>

                  {mockHookCopies.map((copy, idx) => (
                    <div
                      key={idx}
                      onClick={() => { setSelectedCopy(copy); setUseCustomCopy(false) }}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        !useCustomCopy && selectedCopy === copy
                          ? "border-violet-500 bg-violet-50"
                          : "border-gray-200 hover:border-violet-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            !useCustomCopy && selectedCopy === copy
                              ? "border-violet-500"
                              : "border-gray-300"
                          }`}
                        >
                          {!useCustomCopy && selectedCopy === copy && (
                            <div className="w-2 h-2 rounded-full bg-violet-500" />
                          )}
                        </div>
                        <div>
                          <p className="text-xs text-violet-600 font-medium mb-1">옵션 {idx + 1}</p>
                          <p className="text-gray-800 text-sm italic">&ldquo;{copy}&rdquo;</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Direct input option */}
                  <div
                    onClick={() => setUseCustomCopy(true)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      useCustomCopy
                        ? "border-violet-500 bg-violet-50"
                        : "border-gray-200 hover:border-violet-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          useCustomCopy ? "border-violet-500" : "border-gray-300"
                        }`}
                      >
                        {useCustomCopy && (
                          <div className="w-2 h-2 rounded-full bg-violet-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-medium mb-2">직접 입력</p>
                        <textarea
                          value={customCopy}
                          onChange={(e) => setCustomCopy(e.target.value)}
                          onClick={(e) => { e.stopPropagation(); setUseCustomCopy(true) }}
                          placeholder="직접 후킹 문구를 입력하세요..."
                          rows={3}
                          className="w-full text-sm border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-violet-400 resize-none placeholder:text-gray-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              이전
            </Button>
            <Button
              onClick={() => setStep(3)}
              disabled={isAnalyzing || (!useCustomCopy && !selectedCopy) || (useCustomCopy && !customCopy.trim())}
              className="bg-violet-600 hover:bg-violet-700 text-white gap-2 px-6"
            >
              다음 단계
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* ─── STEP 3: 사이즈 조정 ─── */}
      {step === 3 && (
        <div className="space-y-6">
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <LayoutGrid className="w-5 h-5 text-violet-600" />
                  매체별 사이즈 조정
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleAllSizes}
                  className="text-xs h-7 px-3"
                >
                  {selectedSizes.length === adSizes.length ? "전체 해제" : "전체 선택"}
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {adSizes.map((size) => {
                  const isSelected = selectedSizes.includes(size.id)
                  const aspectRatio = size.height / size.width
                  // Cap preview height: scale width to 200px and cap total height at 200px
                  const previewWidth = 200
                  const rawHeight = previewWidth * aspectRatio
                  const previewHeight = Math.min(rawHeight, 160)
                  const previewW = rawHeight > 160 ? Math.round(160 / aspectRatio) : previewWidth

                  const gradientMap: Record<string, string> = {
                    instagram_square: "from-pink-400 to-rose-600",
                    instagram_story: "from-fuchsia-400 to-violet-600",
                    kakao_banner: "from-yellow-400 to-orange-500",
                    naver_da: "from-green-400 to-emerald-600",
                  }
                  const gradient = gradientMap[size.id] ?? "from-blue-400 to-violet-600"

                  return (
                    <div
                      key={size.id}
                      onClick={() => toggleSize(size.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? "border-violet-500 bg-violet-50"
                          : "border-gray-200 hover:border-gray-300 opacity-60"
                      }`}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${
                            isSelected ? "border-violet-500 bg-violet-500" : "border-gray-300 bg-white"
                          }`}
                        >
                          {isSelected && (
                            <CheckCircle2 className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{size.platform}</p>
                          <p className="text-xs text-gray-500">{size.label}</p>
                          <p className="text-xs text-gray-400 font-mono mt-0.5">
                            {size.width}×{size.height}
                          </p>
                        </div>
                      </div>

                      {/* Visual Preview */}
                      <div className="flex justify-center">
                        <div
                          className={`bg-gradient-to-br ${gradient} rounded-lg flex items-center justify-center relative overflow-hidden`}
                          style={{ width: previewW, height: previewHeight }}
                        >
                          <div className="absolute inset-0 flex flex-col items-center justify-center px-2">
                            <p className="text-white text-[9px] font-medium text-center line-clamp-2 leading-tight px-1 drop-shadow">
                              {activeCopy || "후킹 문구 미리보기"}
                            </p>
                          </div>
                          <div className="absolute bottom-1 right-1">
                            <span className="text-white/60 text-[8px] font-medium bg-black/20 px-1 py-0.5 rounded">
                              미리보기
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <p className="text-xs text-gray-400 mt-4 text-center">
                {selectedSizes.length}개 사이즈 선택됨
              </p>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(2)} className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              이전
            </Button>
            <Button
              onClick={() => setStep(4)}
              disabled={selectedSizes.length === 0}
              className="bg-violet-600 hover:bg-violet-700 text-white gap-2 px-6"
            >
              다음 단계
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* ─── STEP 4: 확정 및 저장 ─── */}
      {step === 4 && (
        <div className="space-y-6">
          <Card className="border-gray-200">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-violet-600" />
                확정 및 저장
              </h2>

              <div className="space-y-1">
                <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-4">소재 요약</p>

                {/* Image */}
                <div className="flex items-center gap-4 py-4 border-b border-gray-100">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-violet-400 to-pink-500 flex items-center justify-center shrink-0">
                    <ImageIcon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">이미지</p>
                    <p className="text-sm font-medium text-gray-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      업로드 완료
                    </p>
                  </div>
                </div>

                {/* Hook Copy */}
                <div className="py-4 border-b border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">후킹 문구</p>
                  <p className="text-sm font-medium text-gray-800 italic">
                    &ldquo;{activeCopy}&rdquo;
                  </p>
                </div>

                {/* Sizes */}
                <div className="py-4">
                  <p className="text-xs text-gray-500 mb-2">
                    적용 사이즈 ({selectedSizes.length}개)
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {adSizes
                      .filter((s) => selectedSizes.includes(s.id))
                      .map((s) => (
                        <Badge
                          key={s.id}
                          variant="outline"
                          className="text-xs text-violet-700 border-violet-200 bg-violet-50"
                        >
                          {s.platform} · {s.width}×{s.height}
                        </Badge>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(3)} className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              이전으로
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-violet-600 hover:bg-violet-700 text-white gap-2 px-8"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  저장 중...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  소재 저장
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
