"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { adSizes } from "@/lib/mock-data"
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Eye,
  MousePointerClick,
  ShoppingCart,
  Smartphone,
  Users2,
  Zap,
  Upload,
  Loader2,
} from "lucide-react"

// ─── Constants ───────────────────────────────────────────────────────────────

const STEP_LABELS = [
  "기본정보",
  "광고유형",
  "타겟팅",
  "소재업로드",
  "사이즈",
  "AI문구",
  "예산",
  "검토",
]

const CATEGORIES = [
  "패션/뷰티",
  "게임/IT",
  "육아/생활",
  "음식/레스토랑",
  "스포츠/아웃도어",
]

const AGE_OPTIONS = ["10대", "20대", "30대", "40대", "50대+"]
const REGION_OPTIONS = ["서울", "경기", "부산", "대구", "인천", "기타"]
const INTEREST_OPTIONS = ["패션", "게임", "육아", "요리", "스포츠", "여행", "IT/테크"]

const HOOK_COPIES = [
  "지금 이 순간, 당신의 선택이 내일을 바꿉니다.",
  "한 번만 써보면 돌아올 수 없다. 그게 이 제품의 차이.",
  "오늘 구매 고객 한정 — 이 가격, 다시는 없습니다.",
]

// ─── Progress Indicator ──────────────────────────────────────────────────────

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-start justify-between relative">
        {/* connecting line */}
        <div className="absolute top-4 left-0 right-0 h-px bg-gray-200 z-0" />
        {STEP_LABELS.map((label, i) => {
          const step = i + 1
          const done = step < current
          const active = step === current
          return (
            <div key={step} className="flex flex-col items-center z-10 flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                  done
                    ? "bg-violet-600 border-violet-600 text-white"
                    : active
                    ? "bg-white border-violet-600 text-violet-600"
                    : "bg-white border-gray-300 text-gray-400"
                }`}
              >
                {done ? <CheckCircle2 className="w-4 h-4" /> : step}
              </div>
              <span
                className={`mt-1.5 text-xs font-medium leading-tight text-center ${
                  active ? "text-violet-600" : done ? "text-gray-600" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Shared radio-card styles ────────────────────────────────────────────────

function radioCardClass(selected: boolean) {
  return `p-4 rounded-xl border-2 text-left cursor-pointer transition-all w-full ${
    selected
      ? "border-violet-500 bg-violet-50"
      : "border-gray-200 hover:border-gray-300 bg-white"
  }`
}

// ─── Step 1: 기본 정보 ────────────────────────────────────────────────────────

interface Step1Props {
  name: string
  setName: (v: string) => void
  goal: string
  setGoal: (v: string) => void
}

const GOALS = [
  { key: "brand", label: "브랜드 인지도", icon: Eye },
  { key: "click", label: "클릭/트래픽", icon: MousePointerClick },
  { key: "conversion", label: "전환/구매", icon: ShoppingCart },
  { key: "app", label: "앱 설치", icon: Smartphone },
]

function Step1({ name, setName, goal, setGoal }: Step1Props) {
  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <Label htmlFor="camp-name" className="text-sm font-medium text-gray-700">
          캠페인명 <span className="text-red-500">*</span>
        </Label>
        <Input
          id="camp-name"
          placeholder="예) 무신사 봄 신상 프로모션"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-10 border-gray-200 focus:border-violet-500 focus:ring-violet-500"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">캠페인 목표</Label>
        <div className="grid grid-cols-2 gap-3">
          {GOALS.map(({ key, label, icon: Icon }) => {
            const sel = goal === key
            return (
              <button key={key} type="button" onClick={() => setGoal(key)} className={radioCardClass(sel)}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${sel ? "bg-violet-100" : "bg-gray-100"}`}>
                    <Icon className={`w-4 h-4 ${sel ? "text-violet-600" : "text-gray-500"}`} />
                  </div>
                  <span className={`text-sm font-medium ${sel ? "text-violet-700" : "text-gray-700"}`}>
                    {label}
                  </span>
                </div>
                {sel && (
                  <div className="mt-2 flex justify-end">
                    <CheckCircle2 className="w-4 h-4 text-violet-600" />
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── Step 2: 광고 유형 선택 ───────────────────────────────────────────────────

interface Step2Props {
  adType: string
  setAdType: (v: string) => void
  category: string
  setCategory: (v: string) => void
}

function Step2({ adType, setAdType, category, setCategory }: Step2Props) {
  const types = [
    {
      key: "vertical",
      label: "버티컬형",
      desc: "특정 커뮤니티/버티컬 매체에 집중 노출",
      icon: Users2,
    },
    {
      key: "budget_drain",
      label: "예산소진형",
      desc: "설정 예산을 빠르게 소진하도록 최적화",
      icon: Zap,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-700">광고 유형</Label>
        <div className="grid grid-cols-2 gap-3">
          {types.map(({ key, label, desc, icon: Icon }) => {
            const sel = adType === key
            return (
              <button key={key} type="button" onClick={() => setAdType(key)} className={radioCardClass(sel)}>
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${sel ? "bg-violet-100" : "bg-gray-100"}`}>
                    <Icon className={`w-5 h-5 ${sel ? "text-violet-600" : "text-gray-500"}`} />
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${sel ? "text-violet-700" : "text-gray-700"}`}>{label}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </div>
                {sel && (
                  <div className="mt-2 flex justify-end">
                    <CheckCircle2 className="w-4 h-4 text-violet-600" />
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="category" className="text-sm font-medium text-gray-700">카테고리</Label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full h-10 px-3 rounded-md border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

// ─── Step 3: 타겟팅 설정 ──────────────────────────────────────────────────────

interface Step3Props {
  ages: string[]
  setAges: (v: string[]) => void
  gender: string
  setGender: (v: string) => void
  regions: string[]
  setRegions: (v: string[]) => void
  interests: string[]
  setInterests: (v: string[]) => void
}

function toggleArr(arr: string[], val: string) {
  return arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]
}

function Step3({ ages, setAges, gender, setGender, regions, setRegions, interests, setInterests }: Step3Props) {
  return (
    <div className="space-y-6">
      {/* 연령대 */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">연령대</Label>
        <div className="flex flex-wrap gap-2">
          {AGE_OPTIONS.map((age) => {
            const sel = ages.includes(age)
            return (
              <button
                key={age}
                type="button"
                onClick={() => setAges(toggleArr(ages, age))}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  sel
                    ? "bg-violet-600 text-white border-violet-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-violet-300"
                }`}
              >
                {age}
              </button>
            )
          })}
        </div>
      </div>

      {/* 성별 */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">성별</Label>
        <div className="flex gap-3">
          {["전체", "남성", "여성"].map((g) => {
            const sel = gender === g
            return (
              <button
                key={g}
                type="button"
                onClick={() => setGender(g)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium border-2 transition-all ${
                  sel
                    ? "border-violet-500 bg-violet-50 text-violet-700"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {g}
              </button>
            )
          })}
        </div>
      </div>

      {/* 지역 */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">지역</Label>
        <div className="flex flex-wrap gap-2">
          {REGION_OPTIONS.map((r) => {
            const sel = regions.includes(r)
            return (
              <button
                key={r}
                type="button"
                onClick={() => setRegions(toggleArr(regions, r))}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  sel
                    ? "bg-violet-600 text-white border-violet-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-violet-300"
                }`}
              >
                {r}
              </button>
            )
          })}
        </div>
      </div>

      {/* 관심사 */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">관심사</Label>
        <div className="flex flex-wrap gap-2">
          {INTEREST_OPTIONS.map((it) => {
            const sel = interests.includes(it)
            return (
              <button
                key={it}
                type="button"
                onClick={() => setInterests(toggleArr(interests, it))}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                  sel
                    ? "bg-violet-600 text-white border-violet-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-violet-300"
                }`}
              >
                {it}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── Step 4: 소재 업로드 ──────────────────────────────────────────────────────

interface Step4Props {
  fileName: string
  setFileName: (v: string) => void
  fileUploaded: boolean
  setFileUploaded: (v: boolean) => void
}

function Step4({ fileName, setFileName, fileUploaded, setFileUploaded }: Step4Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      setFileUploaded(true)
    }
  }

  function handleDivClick() {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {!fileUploaded ? (
        <div
          onClick={handleDivClick}
          className="border-2 border-dashed border-gray-300 rounded-xl p-12 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-violet-400 hover:bg-violet-50 transition-all"
        >
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
            <Upload className="w-7 h-7 text-gray-400" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700">클릭하여 파일 업로드</p>
            <p className="text-xs text-gray-400 mt-1">이미지 또는 영상 파일 (JPG, PNG, MP4)</p>
          </div>
          <Badge variant="outline" className="text-xs text-gray-500">
            파일 선택
          </Badge>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Image preview placeholder */}
          <div className="rounded-xl overflow-hidden bg-gradient-to-br from-violet-400 via-purple-500 to-pink-500 h-48 flex items-center justify-center">
            <span className="text-white text-sm font-medium opacity-80">소재 미리보기</span>
          </div>

          {/* File info */}
          <Card className="border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-900">{fileName}</p>
                  <div className="flex gap-3 text-xs text-gray-500">
                    <span>용량: 2.4 MB</span>
                    <span>형식: {fileName.split(".").pop()?.toUpperCase() ?? "IMAGE"}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => { setFileName(""); setFileUploaded(false) }}
                  className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                >
                  삭제
                </button>
              </div>
            </CardContent>
          </Card>

          <button
            type="button"
            onClick={handleDivClick}
            className="text-sm text-violet-600 hover:underline"
          >
            다른 파일로 변경
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Step 5: 사이즈 미리보기 ──────────────────────────────────────────────────

interface Step5Props {
  selectedSizes: string[]
  setSelectedSizes: (v: string[]) => void
}

function Step5({ selectedSizes, setSelectedSizes }: Step5Props) {
  function toggle(id: string) {
    setSelectedSizes(toggleArr(selectedSizes, id))
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">집행할 광고 사이즈를 선택하세요. 자동으로 리사이징됩니다.</p>
      <div className="grid grid-cols-2 gap-4">
        {adSizes.map((size) => {
          const sel = selectedSizes.includes(size.id)
          const ratio = size.height / size.width
          // cap preview width at 150px
          const previewW = Math.min(150, 150)
          const previewH = Math.round(previewW * ratio)
          const cappedH = Math.min(previewH, 150)
          const cappedW = cappedH < previewH ? Math.round(cappedH / ratio) : previewW

          return (
            <button
              key={size.id}
              type="button"
              onClick={() => toggle(size.id)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                sel ? "border-violet-500 bg-violet-50" : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              {/* Preview box */}
              <div className="flex justify-center mb-3">
                <div
                  style={{ width: cappedW, height: cappedH }}
                  className="rounded-md bg-gradient-to-br from-violet-300 via-purple-400 to-pink-400 flex items-center justify-center flex-shrink-0"
                >
                  <span className="text-white text-xs font-medium text-center leading-tight px-1">
                    광고<br />미리보기
                  </span>
                </div>
              </div>

              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className={`text-xs font-semibold ${sel ? "text-violet-700" : "text-gray-700"}`}>
                    {size.label}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {size.width} × {size.height}
                  </p>
                  <Badge variant="outline" className="mt-1 text-xs px-1.5 py-0">
                    {size.platform}
                  </Badge>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    sel ? "border-violet-600 bg-violet-600" : "border-gray-300"
                  }`}
                >
                  {sel && (
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
    </div>
  )
}

// ─── Step 6: AI 후킹 문구 ─────────────────────────────────────────────────────

interface Step6Props {
  selectedCopy: string
  setSelectedCopy: (v: string) => void
  customCopy: string
  setCustomCopy: (v: string) => void
  useCustom: boolean
  setUseCustom: (v: boolean) => void
}

function Step6({ selectedCopy, setSelectedCopy, customCopy, setCustomCopy, useCustom, setUseCustom }: Step6Props) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(t)
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-violet-100 flex items-center justify-center">
            <Loader2 className="w-7 h-7 text-violet-600 animate-spin" />
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-700">AI 분석 중...</p>
          <p className="text-xs text-gray-400 mt-1">캠페인에 맞는 후킹 문구를 생성하고 있습니다</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">AI가 생성한 후킹 문구를 선택하거나 직접 입력하세요.</p>

      <div className="space-y-3">
        {HOOK_COPIES.map((copy, i) => {
          const sel = !useCustom && selectedCopy === copy
          return (
            <button
              key={i}
              type="button"
              onClick={() => { setSelectedCopy(copy); setUseCustom(false) }}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                sel ? "border-violet-500 bg-violet-50" : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <p className={`text-sm leading-relaxed ${sel ? "text-violet-800 font-medium" : "text-gray-700"}`}>
                  &ldquo;{copy}&rdquo;
                </p>
                {sel && <CheckCircle2 className="w-4 h-4 text-violet-600 flex-shrink-0 mt-0.5" />}
              </div>
            </button>
          )
        })}

        {/* 직접 입력 */}
        <button
          type="button"
          onClick={() => setUseCustom(true)}
          className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
            useCustom ? "border-violet-500 bg-violet-50" : "border-gray-200 hover:border-gray-300 bg-white"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-sm font-medium ${useCustom ? "text-violet-700" : "text-gray-600"}`}>
              직접 입력
            </span>
            {useCustom && <CheckCircle2 className="w-4 h-4 text-violet-600" />}
          </div>
          {useCustom && (
            <Textarea
              className="mt-3 border-violet-200 focus:border-violet-500 focus:ring-violet-500 text-sm"
              placeholder="후킹 문구를 직접 입력하세요..."
              value={customCopy}
              onChange={(e) => setCustomCopy(e.target.value)}
              rows={3}
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </button>
      </div>
    </div>
  )
}

// ─── Step 7: 예산/스케줄 ──────────────────────────────────────────────────────

interface Step7Props {
  budget: string
  setBudget: (v: string) => void
  dailyCap: string
  setDailyCap: (v: string) => void
  startDate: string
  setStartDate: (v: string) => void
  endDate: string
  setEndDate: (v: string) => void
  distribution: string
  setDistribution: (v: string) => void
}

function Step7({
  budget,
  setBudget,
  dailyCap,
  setDailyCap,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  distribution,
  setDistribution,
}: Step7Props) {
  const budgetNum = Number(budget) || 0

  // estimate run days
  let runDays = 0
  if (startDate && endDate) {
    const diff = new Date(endDate).getTime() - new Date(startDate).getTime()
    runDays = Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
  }

  const estImpressions = Math.round((budgetNum / 50) * 1000)

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <Label htmlFor="budget" className="text-sm font-medium text-gray-700">
          총 예산 (KRW) <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">₩</span>
          <Input
            id="budget"
            type="number"
            placeholder="1000000"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="h-10 pl-7 border-gray-200 focus:border-violet-500 focus:ring-violet-500"
          />
        </div>
        {budgetNum > 0 && (
          <p className="text-xs text-gray-500">{budgetNum.toLocaleString("ko-KR")}원</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="daily-cap" className="text-sm font-medium text-gray-700">
          일일 예산 한도 (선택)
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">₩</span>
          <Input
            id="daily-cap"
            type="number"
            placeholder="100000"
            value={dailyCap}
            onChange={(e) => setDailyCap(e.target.value)}
            className="h-10 pl-7 border-gray-200 focus:border-violet-500 focus:ring-violet-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="start-date" className="text-sm font-medium text-gray-700">
            시작일
          </Label>
          <Input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="h-10 border-gray-200 focus:border-violet-500 focus:ring-violet-500"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="end-date" className="text-sm font-medium text-gray-700">
            종료일
          </Label>
          <Input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="h-10 border-gray-200 focus:border-violet-500 focus:ring-violet-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">예산 분배</Label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { key: "even", label: "균등 배분" },
            { key: "performance", label: "성과 집중" },
          ].map(({ key, label }) => {
            const sel = distribution === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => setDistribution(key)}
                className={`py-3 rounded-lg text-sm font-medium border-2 transition-all ${
                  sel
                    ? "border-violet-500 bg-violet-50 text-violet-700"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Budget summary */}
      {budgetNum > 0 && (
        <Card className="border-violet-200 bg-violet-50">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm font-semibold text-violet-700">예산 요약</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">총 예산</span>
              <span className="font-semibold text-gray-900">₩{budgetNum.toLocaleString("ko-KR")}</span>
            </div>
            {runDays > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">예상 집행 기간</span>
                <span className="font-semibold text-gray-900">{runDays}일</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">예상 노출</span>
              <span className="font-semibold text-violet-700">
                {estImpressions.toLocaleString("ko-KR")} 회
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// ─── Step 8: 검토 및 제출 ─────────────────────────────────────────────────────

interface Step8Props {
  name: string
  goal: string
  adType: string
  category: string
  ages: string[]
  gender: string
  regions: string[]
  fileUploaded: boolean
  selectedSizes: string[]
  selectedCopy: string
  customCopy: string
  useCustom: boolean
  budget: string
  startDate: string
  endDate: string
  onSubmit: () => void
  submitting: boolean
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start py-2.5">
      <span className="text-sm text-gray-500 flex-shrink-0 w-28">{label}</span>
      <span className="text-sm font-medium text-gray-900 text-right">{value}</span>
    </div>
  )
}

const GOAL_LABELS: Record<string, string> = {
  brand: "브랜드 인지도",
  click: "클릭/트래픽",
  conversion: "전환/구매",
  app: "앱 설치",
}

function Step8({
  name,
  goal,
  adType,
  category,
  ages,
  gender,
  regions,
  fileUploaded,
  selectedSizes,
  selectedCopy,
  customCopy,
  useCustom,
  budget,
  startDate,
  endDate,
  onSubmit,
  submitting,
}: Step8Props) {
  const activeCopy = useCustom ? customCopy : selectedCopy
  const truncCopy = activeCopy.length > 40 ? activeCopy.slice(0, 40) + "..." : activeCopy
  const budgetNum = Number(budget) || 0

  const targetSummary = [
    ages.length > 0 ? ages.join(", ") : "전체",
    gender,
    regions.length > 0 ? regions.join(", ") : "전체",
  ].join(" / ")

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">캠페인 정보를 최종 확인하세요.</p>

      <Card className="border-gray-200">
        <CardContent className="p-4 divide-y divide-gray-100">
          <SummaryRow label="캠페인명" value={name || "—"} />
          <SummaryRow label="목표" value={GOAL_LABELS[goal] ?? goal} />
          <SummaryRow label="광고 유형" value={adType === "vertical" ? "버티컬형" : "예산소진형"} />
          <SummaryRow label="카테고리" value={category} />
          <SummaryRow label="타겟팅" value={targetSummary} />
          <SummaryRow label="소재" value={fileUploaded ? "1개 업로드됨" : "업로드 없음"} />
          <SummaryRow label="사이즈" value={`${selectedSizes.length}개 선택됨`} />
          <SummaryRow label="후킹 문구" value={truncCopy || "—"} />
          <SummaryRow
            label="예산"
            value={budgetNum > 0 ? `₩${budgetNum.toLocaleString("ko-KR")}` : "—"}
          />
          <SummaryRow
            label="기간"
            value={startDate && endDate ? `${startDate} ~ ${endDate}` : "—"}
          />
        </CardContent>
      </Card>

      <Button
        onClick={onSubmit}
        disabled={submitting}
        className="w-full bg-violet-600 hover:bg-violet-700 text-white h-11 text-sm font-semibold gap-2"
      >
        {submitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            제출 중...
          </>
        ) : (
          <>
            캠페인 제출
            <ChevronRight className="w-4 h-4" />
          </>
        )}
      </Button>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function NewCampaignPage() {
  const router = useRouter()

  const [currentStep, setCurrentStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)

  // Step 1
  const [name, setName] = useState("")
  const [goal, setGoal] = useState("brand")

  // Step 2
  const [adType, setAdType] = useState("vertical")
  const [category, setCategory] = useState("패션/뷰티")

  // Step 3
  const [ages, setAges] = useState<string[]>([])
  const [gender, setGender] = useState("전체")
  const [regions, setRegions] = useState<string[]>([])
  const [interests, setInterests] = useState<string[]>([])

  // Step 4
  const [fileName, setFileName] = useState("")
  const [fileUploaded, setFileUploaded] = useState(false)

  // Step 5
  const [selectedSizes, setSelectedSizes] = useState<string[]>(adSizes.map((s) => s.id))

  // Step 6
  const [selectedCopy, setSelectedCopy] = useState(HOOK_COPIES[0])
  const [customCopy, setCustomCopy] = useState("")
  const [useCustom, setUseCustom] = useState(false)

  // Step 7
  const [budget, setBudget] = useState("")
  const [dailyCap, setDailyCap] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [distribution, setDistribution] = useState("even")

  // ── Validation ──────────────────────────────────────────────────────────────

  function canProceed(): boolean {
    if (currentStep === 1) return name.trim().length > 0
    if (currentStep === 7) return Number(budget) > 0
    return true
  }

  // ── Navigation ──────────────────────────────────────────────────────────────

  function handleNext() {
    if (currentStep < 8) setCurrentStep((s) => s + 1)
  }

  function handleBack() {
    if (currentStep > 1) setCurrentStep((s) => s - 1)
  }

  async function handleSubmit() {
    setSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    router.push("/campaigns")
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">새 캠페인 만들기</h1>
        <p className="text-sm text-gray-500 mt-1">단계별로 캠페인을 설정하세요</p>
      </div>

      {/* Progress */}
      <StepIndicator current={currentStep} />

      {/* Step Content */}
      <div className="min-h-[360px]">
        {currentStep === 1 && (
          <Step1 name={name} setName={setName} goal={goal} setGoal={setGoal} />
        )}
        {currentStep === 2 && (
          <Step2 adType={adType} setAdType={setAdType} category={category} setCategory={setCategory} />
        )}
        {currentStep === 3 && (
          <Step3
            ages={ages}
            setAges={setAges}
            gender={gender}
            setGender={setGender}
            regions={regions}
            setRegions={setRegions}
            interests={interests}
            setInterests={setInterests}
          />
        )}
        {currentStep === 4 && (
          <Step4
            fileName={fileName}
            setFileName={setFileName}
            fileUploaded={fileUploaded}
            setFileUploaded={setFileUploaded}
          />
        )}
        {currentStep === 5 && (
          <Step5 selectedSizes={selectedSizes} setSelectedSizes={setSelectedSizes} />
        )}
        {currentStep === 6 && (
          <Step6
            selectedCopy={selectedCopy}
            setSelectedCopy={setSelectedCopy}
            customCopy={customCopy}
            setCustomCopy={setCustomCopy}
            useCustom={useCustom}
            setUseCustom={setUseCustom}
          />
        )}
        {currentStep === 7 && (
          <Step7
            budget={budget}
            setBudget={setBudget}
            dailyCap={dailyCap}
            setDailyCap={setDailyCap}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            distribution={distribution}
            setDistribution={setDistribution}
          />
        )}
        {currentStep === 8 && (
          <Step8
            name={name}
            goal={goal}
            adType={adType}
            category={category}
            ages={ages}
            gender={gender}
            regions={regions}
            fileUploaded={fileUploaded}
            selectedSizes={selectedSizes}
            selectedCopy={selectedCopy}
            customCopy={customCopy}
            useCustom={useCustom}
            budget={budget}
            startDate={startDate}
            endDate={endDate}
            onSubmit={handleSubmit}
            submitting={submitting}
          />
        )}
      </div>

      {/* Navigation */}
      <Separator className="my-6" />
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1}
          className="gap-2 border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40"
        >
          <ChevronLeft className="w-4 h-4" />
          이전
        </Button>

        {currentStep < 8 && (
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="bg-violet-600 hover:bg-violet-700 text-white gap-2 disabled:opacity-40"
          >
            다음
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}

        {currentStep === 8 && (
          <Button
            variant="outline"
            onClick={handleBack}
            className="gap-2 border-gray-200 text-gray-600 hover:bg-gray-50"
          >
            <ChevronLeft className="w-4 h-4" />
            이전으로
          </Button>
        )}
      </div>
    </div>
  )
}
