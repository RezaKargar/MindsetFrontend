"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Play, Quote } from "lucide-react"

type Testimonial = {
  id: string
  name: string
  role: string
  company: string | null
  content: string
  video_url: string | null
  thumbnail_url: string | null
  avatar_url: string | null
  rating: number | null
}

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [selectedTestimonial, setSelectedTestimonial] = useState<string | null>(null)

  const openVideo = (id: string) => {
    setSelectedTestimonial(id)
  }

  const closeVideo = () => {
    setSelectedTestimonial(null)
  }

  const currentTestimonial = testimonials.find((t) => t.id === selectedTestimonial)

  if (testimonials.length === 0) {
    return null
  }

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">نظرات شرکت‌کنندگان</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          تجربه واقعی دانشجویان ما از کارگاه‌های Mindset Makers Academy
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              {/* Video Thumbnail */}
              {testimonial.video_url && (
                <div
                  className="relative aspect-video bg-card cursor-pointer group"
                  onClick={() => openVideo(testimonial.id)}
                >
                  <Image
                    src={testimonial.thumbnail_url || "/placeholder.svg"}
                    alt={`ویدیو ${testimonial.name}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-background/60 group-hover:bg-background/40 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-primary-foreground mr-1" />
                    </div>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={testimonial.avatar_url || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    {testimonial.company && <p className="text-sm text-muted-foreground">{testimonial.company}</p>}
                  </div>
                  <Quote className="w-8 h-8 text-primary/20 flex-shrink-0" />
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">{testimonial.content}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Video Dialog */}
      <Dialog open={!!selectedTestimonial} onOpenChange={closeVideo}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {currentTestimonial?.name} - {currentTestimonial?.role}
            </DialogTitle>
          </DialogHeader>
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={currentTestimonial?.video_url || ""}
              title={`ویدیو ${currentTestimonial?.name}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            />
          </div>
          <div className="space-y-2">
            <p className="text-muted-foreground leading-relaxed">{currentTestimonial?.content}</p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
