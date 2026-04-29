import Link from "next/link";
import { Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type PricingTier = {
  name: string;
  price: string;
  priceNote: string;
  credit: string;
  description: string;
  features: string[];
  cta: string;
  ctaHref: string;
  recommended: boolean;
};

const tiers: PricingTier[] = [
  {
    name: "Starter",
    price: "무료",
    priceNote: "",
    credit: "크레딧 50,000원 제공",
    description: "처음 시작하는 브랜드를 위한 플랜",
    features: [
      "캠페인 2개",
      "소재 5개",
      "기본 매체 2개",
      "기본 성과 리포트",
      "이메일 지원",
    ],
    cta: "무료로 시작하기",
    ctaHref: "/signup",
    recommended: false,
  },
  {
    name: "Growth",
    price: "99,000원",
    priceNote: "/ 월",
    credit: "크레딧 200,000원 포함",
    description: "성장 중인 브랜드를 위한 올인원 플랜",
    features: [
      "캠페인 10개",
      "소재 30개",
      "전체 매체 연동",
      "AI 크리에이티브 생성",
      "실시간 성과 리포트",
      "우선 이메일 + 채팅 지원",
    ],
    cta: "Growth 시작하기",
    ctaHref: "/signup",
    recommended: true,
  },
  {
    name: "Enterprise",
    price: "문의",
    priceNote: "",
    credit: "무제한",
    description: "대규모 운영을 위한 커스텀 플랜",
    features: [
      "무제한 캠페인",
      "무제한 소재",
      "커스텀 매체 연동",
      "전담 매니저",
      "API 연동",
      "SLA 보장",
    ],
    cta: "영업팀 문의",
    ctaHref: "/signup",
    recommended: false,
  },
];

export default function PricingPage() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-violet-50 via-white to-indigo-50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            투명한 요금, 예측 가능한 성과
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            숨겨진 비용 없이 필요한 만큼만 사용하세요
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 items-start">
            {tiers.map((tier) => (
              <Card
                key={tier.name}
                className={cn(
                  "relative flex flex-col border transition-shadow",
                  tier.recommended
                    ? "border-violet-500 shadow-xl shadow-violet-100 ring-2 ring-violet-500"
                    : "border-gray-200 shadow-sm hover:shadow-md"
                )}
              >
                {tier.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-violet-600 text-white px-4 py-1 text-sm font-semibold shadow">
                      추천
                    </Badge>
                  </div>
                )}

                <CardHeader className="pt-8 pb-4">
                  <p className="text-sm font-semibold uppercase tracking-widest text-violet-600 mb-1">
                    {tier.name}
                  </p>
                  <div className="flex items-end gap-1 mt-2">
                    <span className="text-4xl font-extrabold text-gray-900">
                      {tier.price}
                    </span>
                    {tier.priceNote && (
                      <span className="text-base text-gray-400 mb-1">{tier.priceNote}</span>
                    )}
                  </div>
                  <p className="text-sm text-violet-600 font-medium mt-1">{tier.credit}</p>
                  <CardTitle className="text-sm text-gray-500 font-normal mt-2">
                    {tier.description}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col flex-1 gap-6">
                  <ul className="space-y-3 flex-1">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <Check
                          className={cn(
                            "h-4 w-4 flex-shrink-0",
                            tier.recommended ? "text-violet-600" : "text-gray-400"
                          )}
                        />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={tier.ctaHref}
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "w-full font-semibold justify-center",
                      tier.recommended
                        ? "bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-200"
                        : "bg-gray-900 hover:bg-gray-800 text-white"
                    )}
                  >
                    {tier.cta}
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900">궁금한 점이 있으신가요?</h2>
          <p className="mt-3 text-gray-500">
            요금제 변경, 환불, 크레딧 사용 방법 등 언제든지 문의주세요.
          </p>
          <Link
            href="/signup"
            className={cn(buttonVariants({ variant: "outline" }), "mt-6 border-violet-300 text-violet-700 hover:bg-violet-50")}
          >
            팀에 문의하기
          </Link>
        </div>
      </section>
    </main>
  );
}
