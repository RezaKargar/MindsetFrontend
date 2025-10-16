import { getSupabaseServerClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import CarouselTable from "@/components/admin/carousel-table"

export default async function AdminCarouselPage() {
  const supabase = await getSupabaseServerClient()
  const { data: images } = await supabase.from("carousel_images").select("*").order("order_index")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">مدیریت تصاویر اسلایدر</h2>
          <p className="text-muted-foreground mt-2">افزودن و مدیریت تصاویر اسلایدر صفحه اصلی</p>
        </div>
        <Link href="/admin/carousel/new">
          <Button>
            <Plus className="ml-2 h-4 w-4" />
            تصویر جدید
          </Button>
        </Link>
      </div>

      <CarouselTable images={images || []} />
    </div>
  )
}
