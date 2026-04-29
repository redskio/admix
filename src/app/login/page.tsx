"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Mock auth — navigate to dashboard after brief delay
    setTimeout(() => {
      router.push("/dashboard");
    }, 600);
  }

  return (
    <main className="pt-16 min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo mark */}
        <div className="text-center mb-8">
          <span className="inline-block text-2xl font-extrabold text-violet-600 tracking-tight">
            AdMix
          </span>
          <p className="mt-1 text-sm text-gray-500">광고 자동화 플랫폼</p>
        </div>

        <Card className="border border-gray-200 shadow-xl shadow-violet-50">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-gray-900 text-center">
              로그인
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  이메일
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 border-gray-300 focus-visible:ring-violet-500"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    비밀번호
                  </Label>
                  <Link
                    href="#"
                    className="text-xs text-violet-600 hover:text-violet-700 font-medium"
                  >
                    비밀번호 찾기
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 border-gray-300 focus-visible:ring-violet-500"
                  />
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading}
                className={cn(
                  "w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2.5 shadow-md shadow-violet-200",
                  loading && "opacity-70 cursor-not-allowed"
                )}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    로그인 중...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    로그인
                  </span>
                )}
              </Button>
            </form>

            {/* Social login divider */}
            <div className="my-6 flex items-center gap-3">
              <Separator className="flex-1" />
              <span className="text-xs text-gray-400 font-medium whitespace-nowrap">
                또는 소셜 로그인
              </span>
              <Separator className="flex-1" />
            </div>

            {/* Social buttons (cosmetic) */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                className="border-gray-300 text-gray-600 hover:bg-gray-50 text-sm font-medium"
              >
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-gray-300 text-gray-600 hover:bg-gray-50 text-sm font-medium"
              >
                Kakao
              </Button>
            </div>

            {/* Sign up link */}
            <p className="mt-6 text-center text-sm text-gray-500">
              계정이 없으신가요?{" "}
              <Link
                href="/signup"
                className="font-semibold text-violet-600 hover:text-violet-700"
              >
                회원가입
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
