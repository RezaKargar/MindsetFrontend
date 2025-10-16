import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Clock, ArrowLeft } from "lucide-react"
import type { Workshop } from "@/lib/workshops"
import type React from "react";

interface WorkshopCardProps {
  workshop: Workshop
}

export function WorkshopCard({ workshop }: WorkshopCardProps) {
  const availableSeats = workshop.capacity - workshop.enrolled
  const isAlmostFull = availableSeats <= 5

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 py-0">
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
        {/* Badges overlay */}
        <div className="flex gap-2">
          <Badge variant={workshop.type === "online" ? "default" : "secondary"}>
            {workshop.type === "online" ? "آنلاین" : "حضوری"}
          </Badge>
          {isAlmostFull && <Badge variant="destructive">ظرفیت محدود</Badge>}
        </div>
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{workshop.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{workshop.shortDescription}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{workshop.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(workshop.start_date).toLocaleDateString("fa-IR")}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>
              {workshop.enrolled}/{workshop.capacity}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-sm text-muted-foreground">مدرس:</span>
          <span className="text-sm font-medium">{workshop.instructor}</span>
        </div>
        { workshop.price > 0 ?
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">هزینه:</span>
              <span className="text-lg font-bold">
            {workshop.price.toLocaleString("fa-IR")} <span className="text-sm font-normal">تومان</span>
          </span>
            </div>
            : <></>
        }

      </CardContent>

      <CardFooter className="flex gap-2">
        <Button asChild className="flex-1 gap-2">
          <Link href={`/workshops/${workshop.slug}`}>
            مشاهده جزئیات
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
