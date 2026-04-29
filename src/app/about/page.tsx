import { Sparkles, Layers, TrendingUp, BarChart3 } from "lucide-react";

const sections = [
  {
    icon: Sparkles,
    title: "AI 카피 자동 생성",
    description:
      "제품 이미지와 키워드를 입력하면 GPT 기반 크리에이티브 엔진이 타깃별 후킹 문구를 자동으로 생성합니다. A/B 테스트를 위한 수십 가지 변형도 즉시 제안해 광고 제작 시간을 90% 줄여줍니다.",
    badge: "AI Copywriting",
    reverse: false,
  },
  {
    icon: Layers,
    title: "매체별 자동 사이즈 조정",
    description:
      "하나의 소재로 인스타그램 1:1, 스토리 9:16, 카카오 배너, 네이버 GFA 등 20가지 이상의 매체 스펙에 맞는 포맷을 자동 생성합니다. 다시 디자인할 필요가 없습니다.",
    badge: "Auto Resize",
    reverse: true,
  },
  {
    icon: TrendingUp,
    title: "버티컬 매체 자동 집행",
    description:
      "광고 소재가 준비되면 AdMix가 직접 매체 API에 연결해 캠페인을 자동으로 집행합니다. 예산, 스케줄, 타깃팅 모두 설정 한 번으로 끝납니다.",
    badge: "Media Buying",
    reverse: false,
  },
  {
    icon: BarChart3,
    title: "실시간 성과 리포트",
    description:
      "노출, 클릭, 전환, ROAS를 실시간으로 모니터링합니다. 매체별 성과를 자동으로 비교하고, 성과가 낮은 소재는 자동 중단, 높은 소재에 예산을 재분배합니다.",
    badge: "Real-time Analytics",
    reverse: true,
  },
];

export default function AboutPage() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-violet-950 to-indigo-900 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-400 mb-4">
            About AdMix
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            마케팅 대행사를{" "}
            <span className="text-violet-400">AI로 대체하다</span>
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto leading-8">
            AdMix는 중소 브랜드가 대형 대행사 없이도 프로급 디지털 광고를 집행할 수 있도록 설계된 올인원 AI 광고 플랫폼입니다.
          </p>
        </div>
      </section>

      {/* Feature Sections */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-28">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.title}
                className={`flex flex-col gap-12 lg:flex-row lg:items-center ${
                  section.reverse ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Visual */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="h-64 w-64 rounded-3xl bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center shadow-inner">
                    <Icon className="h-24 w-24 text-violet-500" strokeWidth={1.25} />
                  </div>
                </div>

                {/* Text */}
                <div className="flex-1">
                  <span className="inline-block rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 mb-4">
                    {section.badge}
                  </span>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {section.title}
                  </h2>
                  <p className="text-base text-gray-500 leading-relaxed">
                    {section.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Mission */}
      <section className="bg-violet-50 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            모든 브랜드에게 공평한 광고 기회를
          </h2>
          <p className="mt-4 text-gray-600 text-lg leading-8">
            대기업만 누리던 정교한 디지털 광고를, 이제 누구나 사용할 수 있도록 — AdMix는 그 미션에 집중합니다.
          </p>
        </div>
      </section>
    </main>
  );
}
