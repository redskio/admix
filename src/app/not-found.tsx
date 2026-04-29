import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-8xl font-extrabold text-violet-600">404</h1>
        <h2 className="mt-4 text-2xl font-bold text-gray-900">페이지를 찾을 수 없습니다</h2>
        <p className="mt-2 text-gray-500">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
        <div className="mt-8 flex gap-3 justify-center">
          <Link
            href="/"
            className="px-6 py-2.5 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors"
          >
            홈으로 돌아가기
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            대시보드
          </Link>
        </div>
      </div>
    </main>
  )
}
