"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  CreditCard,
  ChevronLeft,
  Loader2,
  CheckCircle2,
  Smartphone,
  Globe,
} from "lucide-react"

const PRESET_AMOUNTS = [100000, 300000, 500000, 1000000]

const PAYMENT_METHODS = [
  { id: "card", label: "신용카드", icon: CreditCard, description: "VISA, Mastercard, 국내 카드" },
  { id: "kakao", label: "카카오페이", icon: Smartphone, description: "카카오 계정으로 간편결제" },
  { id: "naver", label: "네이버페이", icon: Globe, description: "네이버 계정으로 간편결제" },
]

function formatKRW(amount: number): string {
  return `₩${amount.toLocaleString("ko-KR")}`
}

export default function ChargeCreditsPage() {
  const router = useRouter()
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState<string>("")
  const [selectedMethod, setSelectedMethod] = useState<string>("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const chargeAmount =
    selectedAmount !== null
      ? selectedAmount
      : customAmount
      ? parseInt(customAmount.replace(/[^0-9]/g, ""), 10) || 0
      : 0

  const vat = Math.round(chargeAmount * 0.1)
  const total = chargeAmount + vat

  function handlePresetClick(amount: number) {
    setSelectedAmount(amount)
    setCustomAmount("")
  }

  function handleCustomInput(value: string) {
    const digits = value.replace(/[^0-9]/g, "")
    setCustomAmount(digits)
    setSelectedAmount(null)
  }

  async function handlePayment() {
    if (chargeAmount <= 0) return
    setIsProcessing(true)
    await new Promise((res) => setTimeout(res, 1500))
    setIsSuccess(true)
    await new Promise((res) => setTimeout(res, 600))
    router.push("/billing")
  }

  if (isSuccess) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">결제 완료!</h2>
          <p className="text-gray-500 text-sm">{formatKRW(total)} 결제가 완료되었습니다</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => router.push("/billing")}
          className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">크레딧 충전</h1>
          <p className="text-sm text-gray-500 mt-0.5">광고 캠페인에 사용할 크레딧을 충전하세요</p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Amount Selection */}
        <Card className="border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-gray-800">충전 금액 선택</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Preset Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {PRESET_AMOUNTS.map((amount) => (
                <button
                  key={amount}
                  onClick={() => handlePresetClick(amount)}
                  className={`py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-all ${
                    selectedAmount === amount
                      ? "border-violet-500 bg-violet-50 text-violet-700"
                      : "border-gray-200 text-gray-700 hover:border-violet-300 hover:bg-violet-50"
                  }`}
                >
                  {formatKRW(amount)}
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="space-y-2">
              <Label htmlFor="customAmount" className="text-sm text-gray-600">
                직접 입력
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-sm">
                  ₩
                </span>
                <Input
                  id="customAmount"
                  value={customAmount ? parseInt(customAmount).toLocaleString("ko-KR") : ""}
                  onChange={(e) => handleCustomInput(e.target.value)}
                  onFocus={() => setSelectedAmount(null)}
                  placeholder="금액을 직접 입력하세요"
                  className="pl-7 focus-visible:ring-violet-400"
                />
              </div>
              {chargeAmount > 0 && (
                <p className="text-xs text-violet-600 font-medium">
                  선택된 금액: {formatKRW(chargeAmount)}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card className="border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-gray-800">결제 수단</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {PAYMENT_METHODS.map((method) => {
              const Icon = method.icon
              const isSelected = selectedMethod === method.id
              return (
                <div
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    isSelected
                      ? "border-violet-500 bg-violet-50"
                      : "border-gray-200 hover:border-violet-300 hover:bg-gray-50"
                  }`}
                >
                  {/* Radio */}
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      isSelected ? "border-violet-500" : "border-gray-300"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-violet-500" />
                    )}
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected ? "bg-violet-100" : "bg-gray-100"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isSelected ? "text-violet-600" : "text-gray-500"}`} />
                  </div>

                  {/* Label */}
                  <div>
                    <p className={`text-sm font-semibold ${isSelected ? "text-violet-700" : "text-gray-700"}`}>
                      {method.label}
                    </p>
                    <p className="text-xs text-gray-400">{method.description}</p>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-gray-800">주문 요약</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">충전 금액</span>
                <span className="text-sm font-medium text-gray-900">
                  {chargeAmount > 0 ? formatKRW(chargeAmount) : "—"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">부가세 (10%)</span>
                <span className="text-sm font-medium text-gray-900">
                  {chargeAmount > 0 ? formatKRW(vat) : "—"}
                </span>
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <span className="text-base font-bold text-gray-900">총 결제 금액</span>
                <span className="text-xl font-bold text-violet-700">
                  {chargeAmount > 0 ? formatKRW(total) : "—"}
                </span>
              </div>
            </div>

            <Button
              onClick={handlePayment}
              disabled={chargeAmount <= 0 || isProcessing}
              className="w-full mt-5 bg-violet-600 hover:bg-violet-700 text-white h-12 text-base font-semibold gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  결제 처리 중...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  {chargeAmount > 0 ? `${formatKRW(total)} 결제하기` : "금액을 선택해주세요"}
                </>
              )}
            </Button>

            <p className="text-xs text-gray-400 text-center mt-3">
              결제 완료 후 크레딧이 즉시 지급됩니다
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
