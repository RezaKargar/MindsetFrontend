import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { WorkshopCarousel } from "@/components/workshop-carousel"
import { Stats } from "@/components/stats"
import { FeaturedWorkshops } from "@/components/featured-workshops"
import { Testimonials } from "@/components/testimonials"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export const revalidate = 60 // Revalidate every 60 seconds

export default async function HomePage() {
  const supabase = await getSupabaseServerClient()

  // Fetch carousel images, featured workshops, and testimonials
  const [{ data: carouselImages }, { data: featuredWorkshops }, { data: testimonials }] = await Promise.all([
    supabase.from("carousel_images").select("*").eq("is_active", true).order("order_index"),
    supabase.from("workshops").select("*").eq("is_featured", true).eq("is_published", true).order("start_date", { ascending: true }).limit(3),
    supabase.from("testimonials").select("*").eq("is_approved", true).eq("is_featured", true).limit(6),
  ])

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero carouselImages={carouselImages || []} />
        <Stats />
        <WorkshopCarousel carouselImages={carouselImages || []} />
        <Testimonials testimonials={testimonials || []} />
        <FeaturedWorkshops workshops={featuredWorkshops || []} />

        {/* CTA Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">آماده شروع یادگیری هستید؟</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              با ثبت‌نام در کارگاه‌های ما، مسیر حرفه‌ای خود را در دنیای برنامه‌نویسی آغاز کنید
            </p>
            <Button asChild size="lg" className="gap-2">
              <Link href="/workshops">
                مشاهده تمام کارگاه‌ها
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
