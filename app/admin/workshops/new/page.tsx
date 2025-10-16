import WorkshopForm from "@/components/admin/workshop-form"

export default function NewWorkshopPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">کارگاه جدید</h2>
        <p className="text-muted-foreground mt-2">اطلاعات کارگاه آموزشی جدید را وارد کنید</p>
      </div>

      <WorkshopForm />
    </div>
  )
}
