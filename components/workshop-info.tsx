import { Clock, Users, Calendar, MapPin, Video } from "lucide-react"
import type { Workshop } from "@/lib/workshops"

interface WorkshopInfoProps {
  workshop: Workshop
}

export function WorkshopInfo({ workshop }: WorkshopInfoProps) {
  console.log(workshop)
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">اطلاعات کارگاه</h2>
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium mb-1">مدت زمان</h3>
            <p className="text-muted-foreground text-sm">{workshop.duration}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium mb-1">تاریخ شروع</h3>
            <p className="text-muted-foreground text-sm">{new Date(workshop.start_date).toLocaleDateString("fa-IR")}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium mb-1">ظرفیت</h3>
            <p className="text-muted-foreground text-sm">
              {workshop.enrolled} نفر ثبت‌نام کرده‌اند از {workshop.capacity} نفر
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            {workshop.type === "online" ? (
              <Video className="w-5 h-5 text-primary" />
            ) : (
              <MapPin className="w-5 h-5 text-primary" />
            )}
          </div>
          <div>
            <h3 className="font-medium mb-1">نوع برگزاری</h3>
            <p className="text-muted-foreground text-sm">
              {workshop.type === "online" ? "آنلاین" : "حضوری - تهران"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
