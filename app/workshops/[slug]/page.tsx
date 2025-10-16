import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WorkshopGallery } from "@/components/workshop-gallery"
import { WorkshopInfo } from "@/components/workshop-info"
import { WorkshopTopics } from "@/components/workshop-topics"
import { RegistrationForm } from "@/components/registration-form"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import {getWorkshopStatus} from "@/lib/workshops";

export const revalidate = 60

export default async function WorkshopDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await getSupabaseServerClient()

  const { data: workshop } = await supabase
    .from("workshops")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single()

  if (!workshop) {
    notFound()
  }

  const { isRegistrationActive, isEnded } = getWorkshopStatus(workshop)

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-card border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="max-w-4xl">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                  {workshop.type === "online" ? "آنلاین" : "حضوری"}
                </span>
                <span className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full">{workshop.duration}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{workshop.title}</h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">{workshop.description}</p>
              <div className="flex flex-wrap gap-6 text-sm">
                <div>
                  <span className="text-muted-foreground">مدرس: </span>
                  <span className="font-medium">{workshop.instructor}</span>
                </div>
                {workshop.start_date && (
                  <div>
                    <span className="text-muted-foreground">تاریخ شروع: </span>
                    <span className="font-medium">{new Date(workshop.start_date).toLocaleDateString("fa-IR")}</span>
                  </div>
                )}
                <div>
                  <span className="text-muted-foreground">ظرفیت: </span>
                  <span className="font-medium">
                    {workshop.enrolled}/{workshop.capacity} نفر
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <WorkshopGallery images={workshop.gallery || []} title={workshop.title} />
              <WorkshopTopics topics={workshop.topics || []} />
              <WorkshopInfo workshop={workshop} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <RegistrationForm workshop={workshop} isRegistrationActive={isRegistrationActive} isEnded={isEnded} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
