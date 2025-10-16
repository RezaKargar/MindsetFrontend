"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Play } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

type CarouselImage = {
  id: string
  image_url: string
  alt_text: string | null
}

export function Hero({ carouselImages }: { carouselImages: CarouselImage[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const images = carouselImages.length > 0 ? carouselImages.map((img) => img.image_url) : ["/programming-workshop.jpg"] // Fallback

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section className="relative min-h-screen flex items-end justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-50">
        {images.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt="Workshop background"
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background/90" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-32 pt-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 relative">
              <Image src="/logo.jpg" alt="Mindset Makers Academy Logo" fill className="object-contain rounded-2xl" priority />
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Mindset Makers Academy
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-8 leading-relaxed">
            آکادمی مهندسی نرم‌افزار با رویکرد یادگیری عمیق و مفهومی
          </p>

          {/* Description */}
          <p className="text-base sm:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            ما با استفاده از روش‌های نوآورانه و تمرکز بر یادگیری عمیق، به شما کمک می‌کنیم تا مهارت‌های واقعی برنامه‌نویسی را
            فرا بگیرید
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="gap-2 w-full sm:w-auto">
              <Link href="/workshops">
                مشاهده کارگاه‌ها
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2 w-full sm:w-auto bg-transparent">
              <Link href="/about">
                <Play className="w-4 h-4" />
                درباره ما
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  )
}
