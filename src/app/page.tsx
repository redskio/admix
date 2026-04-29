import Link from "next/link";
import { Zap, Layers, BarChart3, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Zap,
    title: "AI 후킹 문구 생성",
    description:
      "제품 이미지 하나로 타깃 맞춤형 카피를 자동 생성합니다. GPT 기반 크리에이티브 엔진이 수십 가지 변형을 즉시 제안합니다.",
  },
  {
    icon: Layers,
    title: "매체별 자동 사이즈 조정",
    description:
      "인스타그램, 카카오, 네이버, 유튜브 — 각 매체 스펙에 맞춰 소재를 자동으로 리사이징하고 레이아웃을 최적화합니다.",
  },
  {
    icon: BarChart3,
    title: "실시간 성과 리포트",
    description:
      "노출, 클릭, 전환, ROAS를 실시간으로 추적합니다. 매체별 성과를 한눈에 비교하고 예산을 자동으로 재분배합니다.",
  },
];

const stats = [
  { value: "284,500+", label: "노출" },
  { value: "8,920", label: "클릭" },
  { value: "312", label: "전환" },
];

export default function HomePage() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-indigo-50 py-24 sm:py-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-200 opacity-20 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-indigo-300 opacity-20 blur-3xl" />
        </div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            AI가 만드는 광고,{" "}
            <span className="text-violet-600">자동으로 집행되는</span> 캠페인
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl max-w-2xl mx-auto">
            제품 이미지 하나로 후킹 문구부터 매체 집행까지 — AdMix가 전부 해결합니다
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className={cn(buttonVariants({ size: "lg" }), "bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 text-base font-semibold shadow-lg shadow-violet-200")}
            >
              무료로 시작하기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "border-gray-300 px-8 py-3 text-base font-semibold")}
            >
              서비스 소개 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-violet-600 py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-sm font-medium text-violet-200">{stat.label}</dt>
                <dd className="mt-1 text-4xl font-extrabold text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              광고의 모든 단계를 자동화합니다
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              기획부터 집행, 최적화까지 — 마케터가 아닌 AI가 합니다
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-4">
                    <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100">
                      <Icon className="h-6 w-6 text-violet-600" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-violet-600 to-indigo-600 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            지금 바로 첫 캠페인을 만들어보세요
          </h2>
          <p className="mt-4 text-lg text-violet-200">
            신용카드 없이 무료로 시작. 50,000원 크레딧이 지급됩니다.
          </p>
          <Link
            href="/signup"
            className={cn(buttonVariants({ size: "lg" }), "mt-8 bg-white text-violet-700 hover:bg-violet-50 px-10 py-3 text-base font-semibold shadow-xl")}
          >
            무료로 시작하기
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
