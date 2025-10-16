import { getSupabaseServerClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import TestimonialsTable from "@/components/admin/testimonials-table"

export default async function AdminTestimonialsPage() {
  const supabase = await getSupabaseServerClient()
  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">مدیریت نظرات</h2>
          <p className="text-muted-foreground mt-2">تایید و مدیریت نظرات شرکت‌کنندگان</p>
        </div>
        <Link href="/admin/testimonials/new">
          <Button>
            <Plus className="ml-2 h-4 w-4" />
            نظر جدید
          </Button>
        </Link>
      </div>

      <TestimonialsTable testimonials={testimonials || []} />
    </div>
  )
}
