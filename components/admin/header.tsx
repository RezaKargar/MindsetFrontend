"use client"

import { useRouter } from "next/navigation"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import type { User } from "@supabase/supabase-js"

export default function AdminHeader({ user }: { user: User }) {
  const router = useRouter()
  const supabase = getSupabaseBrowserClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <header className="border-b bg-card">
      <div className="flex items-center justify-between px-8 py-4">
        <h1 className="text-2xl font-bold">پنل مدیریت آکادمی</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{user.email}</span>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="ml-2 h-4 w-4" />
            خروج
          </Button>
        </div>
      </div>
    </header>
  )
}
