"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 relative">
              <Image src="/logo.jpg" alt="Mindset Makers Academy Logo" fill className="object-contain rounded-md" />
            </div>
            <span className="font-bold text-lg hidden sm:block">Mindset Makers Academy</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm hover:text-accent transition-colors">
              خانه
            </Link>
            <Link href="/workshops" className="text-sm hover:text-accent transition-colors">
              کارگاه‌ها
            </Link>
            <Link href="/about" className="text-sm hover:text-accent transition-colors">
              درباره ما
            </Link>
            <Link href="/contact" className="text-sm hover:text-accent transition-colors">
              تماس با ما
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button asChild>
              <Link href="/workshops">ثبت‌نام در کارگاه</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-sm hover:text-accent transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                خانه
              </Link>
              <Link
                href="/workshops"
                className="text-sm hover:text-accent transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                کارگاه‌ها
              </Link>
              <Link
                href="/about"
                className="text-sm hover:text-accent transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                درباره ما
              </Link>
              <Link
                href="/contact"
                className="text-sm hover:text-accent transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                تماس با ما
              </Link>
              <Button asChild className="w-full">
                <Link href="/workshops" onClick={() => setMobileMenuOpen(false)}>
                  ثبت‌نام در کارگاه
                </Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
