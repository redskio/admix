import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/nav/Navbar";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AdMix — 버티컬 광고 플랫폼",
  description: "AI가 광고를 만들고, 매체를 찾고, 캠페인을 집행합니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="h-full">
      <body className={`${geist.className} min-h-full antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
