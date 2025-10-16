"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WorkshopCard } from "@/components/workshop-card"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import useSWR from "swr"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"

const fetcher = async () => {
  const supabase = getSupabaseBrowserClient()
  const { data } = await supabase
    .from("workshops")
    .select("*")
    .eq("is_published", true)
    .order("started_at", { ascending: true })
  return data || []
}

export default function WorkshopsPage() {
  const [filter, setFilter] = useState<"all" | "online" | "in-person">("all")
  const { data: workshops, isLoading } = useSWR("workshops", fetcher)

  const filteredWorkshops = filter === "all" ? workshops : workshops?.filter((workshop) => workshop.type === filter)

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        {/* Page Header */}
        <section className="bg-card border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">کارگاه‌های آموزشی</h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                کارگاه‌های حضوری و آنلاین ما را کشف کنید و مسیر یادگیری خود را انتخاب کنید
              </p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Filter className="w-5 h-5" />
              <span className="text-sm">فیلتر بر اساس:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
                className="text-sm"
              >
                همه کارگاه‌ها
              </Button>
              <Button
                variant={filter === "online" ? "default" : "outline"}
                onClick={() => setFilter("online")}
                className="text-sm"
              >
                آنلاین
              </Button>
              <Button
                variant={filter === "in-person" ? "default" : "outline"}
                onClick={() => setFilter("in-person")}
                className="text-sm"
              >
                حضوری
              </Button>
            </div>
          </div>
        </section>

        {/* Workshops Grid */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {isLoading ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">در حال بارگذاری...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWorkshops?.map((workshop) => (
                  <WorkshopCard key={workshop.id} workshop={workshop} />
                ))}
              </div>

              {filteredWorkshops?.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg">کارگاهی با این فیلتر یافت نشد</p>
                </div>
              )}
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}
