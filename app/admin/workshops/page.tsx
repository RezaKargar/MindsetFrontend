import { getSupabaseServerClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import WorkshopsTable from "@/components/admin/workshops-table"

export default async function AdminWorkshopsPage() {
  const supabase = await getSupabaseServerClient()
  const { data: workshops } = await supabase.from("workshops").select("*").order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">مدیریت کارگاه‌ها</h2>
          <p className="text-muted-foreground mt-2">افزودن، ویرایش و حذف کارگاه‌های آموزشی</p>
        </div>
        <Link href="/admin/workshops/new">
          <Button>
            <Plus className="ml-2 h-4 w-4" />
            کارگاه جدید
          </Button>
        </Link>
      </div>

      <WorkshopsTable workshops={workshops || []} />
    </div>
  )
}
