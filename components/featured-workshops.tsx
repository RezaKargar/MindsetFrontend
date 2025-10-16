import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, ArrowLeft } from "lucide-react"
import type React from "react";

type Workshop = {
  id: string
  slug: string
  title: string
  short_description: string | null
  type: string
  duration: string
  image_url: string | null
  enrolled: number
  capacity: number | null
}

export function FeaturedWorkshops({ workshops }: { workshops: Workshop[] }) {
  if (workshops.length === 0) {
    return null
  }

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">کارگاه‌های پیشنهادی</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          کارگاه‌های محبوب و پرطرفدار آکادمی را کشف کنید
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workshops.map((workshop) => (
          <Card key={workshop.id} className="overflow-hidden hover:shadow-lg transition-shadow pt-0">
              <div className="relative w-full overflow-hidden rounded-lg">
                  {/* Very tall container: 3:4 aspect ratio */}
                  <div className="relative w-full pt-[133.33%]">
                      <Image
                          src={workshop.image_url || "/placeholder.svg"}
                          alt={workshop.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                  </div>
              </div>
            <CardHeader>
              <h3 className="text-xl font-bold mb-2 line-clamp-2">{workshop.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{workshop.short_description}</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{workshop.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>
                    {workshop.enrolled}/{workshop.capacity || 0}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full gap-2">
                <Link href={`/workshops/${workshop.slug}`}>
                  مشاهده جزئیات
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button asChild variant="outline" size="lg">
          <Link href="/workshops">مشاهده تمام کارگاه‌ها</Link>
        </Button>
      </div>
    </section>
  )
}
