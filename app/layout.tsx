import type React from "react"
import type { Metadata } from "next"
import { Vazirmatn } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Mindset Makers Academy | Mindset Makers Academy",
  description: "آکادمی مهندسی نرم‌افزار با رویکرد یادگیری عمیق و مفهومی",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl" className="dark">
      <body className={`${vazirmatn.variable} font-sans antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
