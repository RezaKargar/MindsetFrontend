import { getSupabaseServerClient } from "@/lib/supabase/server"
import ContactsTable from "@/components/admin/contacts-table"

export default async function AdminContactsPage() {
  const supabase = await getSupabaseServerClient()
  const { data: contacts } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">مدیریت پیام‌ها</h2>
        <p className="text-muted-foreground mt-2">مشاهده و پاسخ به پیام‌های دریافتی</p>
      </div>

      <ContactsTable contacts={contacts || []} />
    </div>
  )
}
