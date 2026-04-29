"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Building2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Mock signup — navigate to dashboard
    setTimeout(() => {
      router.push("/dashboard");
    }, 700);
  }

  const fields: {
    id: keyof typeof form;
    label: string;
    type: string;
    placeholder: string;
    icon: React.ElementType;
  }[] = [
    {
      id: "name",
      label: "이름",
      type: "text",
      placeholder: "홍길동",
      icon: User,
    },
    {
      id: "email",
      label: "이메일",
      type: "email",
      placeholder: "you@example.com",
      icon: Mail,
    },
    {
      id: "password",
      label: "비밀번호",
      type: "password",
      placeholder: "8자 이상 입력",
      icon: Lock,
    },
    {
      id: "company",
      label: "회사명",
      type: "text",
      placeholder: "(주) AdMix",
      icon: Building2,
    },
  ];

  return (
    <main className="pt-16 min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo mark */}
        <div className="text-center mb-8">
          <span className="inline-block text-2xl font-extrabold text-violet-600 tracking-tight">
            AdMix
          </span>
          <p className="mt-1 text-sm text-gray-500">무료로 시작하세요 — 크레딧 50,000원 즉시 지급</p>
        </div>

        <Card className="border border-gray-200 shadow-xl shadow-violet-50">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-gray-900 text-center">
              회원가입
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSignup} className="space-y-5">
              {fields.map(({ id, label, type, placeholder, icon: Icon }) => (
                <div key={id} className="space-y-1.5">
                  <Label htmlFor={id} className="text-sm font-medium text-gray-700">
                    {label}
                  </Label>
                  <div className="relative">
                    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id={id}
                      name={id}
                      type={type}
                      placeholder={placeholder}
                      value={form[id]}
                      onChange={handleChange}
                      required
                      className="pl-10 border-gray-300 focus-visible:ring-violet-500"
                    />
                  </div>
                </div>
              ))}

              {/* Terms note */}
              <p className="text-xs text-gray-400 leading-relaxed">
                회원가입 시{" "}
                <Link href="#" className="text-violet-600 hover:underline">
                  서비스 이용약관
                </Link>{" "}
                및{" "}
                <Link href="#" className="text-violet-600 hover:underline">
                  개인정보처리방침
                </Link>
                에 동의하게 됩니다.
              </p>

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
                    처리 중...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    회원가입
                  </span>
                )}
              </Button>
            </form>

            {/* Login link */}
            <p className="mt-6 text-center text-sm text-gray-500">
              이미 계정이 있으신가요?{" "}
              <Link
                href="/login"
                className="font-semibold text-violet-600 hover:text-violet-700"
              >
                로그인
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
