"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

type CarouselImage = {
  id: string
  image_url: string
  alt_text: string | null
}

export function WorkshopCarousel({ carouselImages }: { carouselImages: CarouselImage[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const images =
    carouselImages.length > 0
      ? carouselImages
      : [{ id: "1", image_url: "/programming-workshop.jpg", alt_text: "کارگاه برنامه‌نویسی" }]

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, images.length])

  const goToPrevious = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
  }

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">تصاویر کارگاه‌های ما</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          نگاهی به فضای یادگیری و تعامل در کارگاه‌های Mindset Makers Academy
        </p>
      </div>

      <div className="relative max-w-5xl mx-auto">
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-card border border-border">
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image.image_url || "/placeholder.svg"}
                alt={image.alt_text || "تصویر کارگاه"}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white">{image.alt_text || "کارگاه آموزشی"}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
          onClick={goToPrevious}
          aria-label="Previous slide"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
          onClick={goToNext}
          aria-label="Next slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-primary w-8" : "bg-muted-foreground/30"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
