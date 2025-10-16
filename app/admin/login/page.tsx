"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const supabase = getSupabaseBrowserClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    console.log("[v0] Starting login attempt...")

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log("[v0] Login response:", { data, error: signInError })

      if (signInError) {
        console.error("[v0] Login error:", signInError)
        setError(`خطا در ورود: ${signInError.message}`)
        setLoading(false)
        return
      }

      if (data.user) {
        console.log("[v0] Login successful, redirecting to admin...")
        // Wait a bit for the session to be set
        await new Promise((resolve) => setTimeout(resolve, 500))
        router.push("/admin")
        router.refresh()
      }
    } catch (err) {
      console.error("[v0] Unexpected error during login:", err)
      setError("خطای غیرمنتظره رخ داد. لطفا دوباره تلاش کنید.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Image src="/logo.jpg" alt="Mindset Makers Academy" width={80} height={80} className="mx-auto mb-4 rounded-2xl" />
          <h2 className="text-3xl font-bold">ورود به پنل مدیریت</h2>
          <p className="mt-2 text-muted-foreground">برای دسترسی به پنل مدیریت وارد شوید</p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">ایمیل</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
                dir="ltr"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <Label htmlFor="password">رمز عبور</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
                dir="ltr"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="text-destructive text-sm text-center p-3 bg-destructive/10 rounded-md">{error}</div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "در حال ورود..." : "ورود"}
          </Button>

          <div className="text-xs text-muted-foreground text-center mt-4 p-3 bg-muted rounded-md">
            <p className="font-semibold mb-1">راهنمای اولین ورود:</p>
            <p>1. ابتدا اسکریپت‌های SQL را اجرا کنید</p>
            <p>2. در داشبورد Supabase یک کاربر ایجاد کنید</p>
            <p>3. با ایمیل و رمز عبور ایجاد شده وارد شوید</p>
          </div>
        </form>
      </div>
    </div>
  )
}
