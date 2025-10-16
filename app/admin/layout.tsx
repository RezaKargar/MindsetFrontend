import type React from "react"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import AdminSidebar from "@/components/admin/sidebar"
import AdminHeader from "@/components/admin/header"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader user={user} />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  )
}
