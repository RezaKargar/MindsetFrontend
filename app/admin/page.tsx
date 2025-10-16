import { getSupabaseServerClient } from "@/lib/supabase/server"
import { Card } from "@/components/ui/card"
import { BookOpen, Users, MessageSquare, Mail } from "lucide-react"
import { cn } from "@/lib/utils"

export default async function AdminDashboard() {
  const supabase = await getSupabaseServerClient()

  let workshopsCount = 0
  let registrationsCount = 0
  let testimonialsCount = 0
  let contactsCount = 0

  try {
    const [workshops, registrations, testimonials, contacts] = await Promise.all([
      supabase.from("workshops").select("*", { count: "exact", head: true }),
      supabase.from("registrations").select("*", { count: "exact", head: true }),
      supabase.from("testimonials").select("*", { count: "exact", head: true }),
      supabase.from("contact_submissions").select("*", { count: "exact", head: true }),
    ])

    workshopsCount = workshops.count || 0
    registrationsCount = registrations.count || 0
    testimonialsCount = testimonials.count || 0
    contactsCount = contacts.count || 0

    console.log("[v0] Dashboard stats loaded successfully")
  } catch (error) {
    console.error("[v0] Error loading dashboard stats:", error)
  }

  const stats = [
    {
      title: "کارگاه‌ها",
      value: workshopsCount,
      icon: BookOpen,
      color: "text-blue-500",
    },
    {
      title: "ثبت‌نام‌ها",
      value: registrationsCount,
      icon: Users,
      color: "text-green-500",
    },
    {
      title: "نظرات",
      value: testimonialsCount,
      icon: MessageSquare,
      color: "text-purple-500",
    },
    {
      title: "پیام‌ها",
      value: contactsCount,
      icon: Mail,
      color: "text-orange-500",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold">داشبورد</h2>
        <p className="text-muted-foreground mt-2">خلاصه‌ای از وضعیت وب‌سایت</p>
      </div>

      {workshopsCount === 0 && registrationsCount === 0 && testimonialsCount === 0 && contactsCount === 0 && (
        <Card className="p-6 bg-muted">
          <h3 className="font-semibold text-lg mb-2">راهنمای راه‌اندازی</h3>
          <p className="text-sm text-muted-foreground mb-4">
            برای شروع کار با پنل مدیریت، لطفا مراحل زیر را دنبال کنید:
          </p>
          <ol className="text-sm space-y-2 list-decimal list-inside">
            <li>اسکریپت‌های SQL را از پوشه scripts اجرا کنید</li>
            <li>جداول پایگاه داده ایجاد خواهند شد</li>
            <li>داده‌های نمونه وارد پایگاه داده می‌شوند</li>
            <li>صفحه را رفرش کنید تا آمار نمایش داده شود</li>
          </ol>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <Icon className={cn("h-12 w-12", stat.color)} />
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
