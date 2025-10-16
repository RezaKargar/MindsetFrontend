import { getSupabaseServerClient } from "@/lib/supabase/server"
import RegistrationsTable from "@/components/admin/registrations-table"

export default async function AdminRegistrationsPage() {
  const supabase = await getSupabaseServerClient()
  const { data: registrations } = await supabase
    .from("registrations")
    .select("*, workshops(title)")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">مدیریت ثبت‌نام‌ها</h2>
        <p className="text-muted-foreground mt-2">مشاهده و مدیریت ثبت‌نام‌های کارگاه‌ها</p>
      </div>

      <RegistrationsTable registrations={registrations || []} />
    </div>
  )
}
