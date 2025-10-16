"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WorkshopGalleryProps {
  images: string[]
  title: string
}

export function WorkshopGallery({ images, title }: WorkshopGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">تصاویر کارگاه</h2>

      {/* Main Image */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-card border border-border">
        <Image
          src={images[currentIndex] || "/placeholder.svg"}
          alt={`${title} - تصویر ${currentIndex + 1}`}
          fill
          className="object-cover"
        />

        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
              onClick={goToPrevious}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 left-4 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
              onClick={goToNext}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex ? "border-primary" : "border-border hover:border-primary/50"
              }`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${title} - تصویر کوچک ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
