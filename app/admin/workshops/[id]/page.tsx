import { getSupabaseServerClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import WorkshopForm from "@/components/admin/workshop-form"

export default async function EditWorkshopPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await getSupabaseServerClient()

  const { data: workshop } = await supabase.from("workshops").select("*").eq("id", id).single()

  if (!workshop) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">ویرایش کارگاه</h2>
        <p className="text-muted-foreground mt-2">اطلاعات کارگاه را ویرایش کنید</p>
      </div>

      <WorkshopForm workshop={workshop} />
    </div>
  )
}
