"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Workshop } from "@/lib/workshops"
import { CheckCircle2, Loader2 } from "lucide-react"

interface RegistrationFormProps {
  workshop: Workshop
  isRegistrationActive?: boolean
  isEnded?: boolean
}

export function RegistrationForm({
                                   workshop,
                                   isRegistrationActive = true,
                                   isEnded = false,
                                 }: RegistrationFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isRegistrationActive || isEnded) return

    setIsLoading(true)

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          workshopId: workshop.id,
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
      } else {
        console.error("Registration failed")
      }
    } catch (error) {
      console.error("Error submitting registration:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const isFormDisabled = !isRegistrationActive || isEnded || isLoading
  const showStamp = !isRegistrationActive || isEnded
  const stampText = isEnded ? "کارگاه به پایان رسیده است" : "ثبت‌نام غیرفعال است"

  if (isSubmitted) {
    return (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold">ثبت‌نام موفق!</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                درخواست شما با موفقیت ثبت شد. به زودی با شما تماس خواهیم گرفت.
              </p>
            </div>
          </CardContent>
        </Card>
    )
  }

  return (
      <Card className="relative overflow-hidden">
        {/* Stamp overlay */}
        {showStamp && (
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
              <div className="bg-red-500/20 backdrop-blur-none rounded-lg px-6 py-3 border-2 border-red-600/30">
            <span className="text-red-700 font-black text-xl md:text-xl tracking-wide uppercase">
              {stampText}
            </span>
              </div>
            </div>
        )}

        <CardHeader>
          <CardTitle>ثبت‌نام در کارگاه</CardTitle>
          <CardDescription>
            {isEnded
                ? "این کارگاه به پایان رسیده است."
                : isRegistrationActive
                    ? "فرم زیر را تکمیل کنید تا در کارگاه ثبت‌نام شوید"
                    : "ثبت‌نام برای این کارگاه در حال حاضر غیرفعال است."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
              onSubmit={handleSubmit}
              className={`space-y-4 transition-all duration-200 ${
                  showStamp ? "opacity-40 blur-[1px]" : ""
              }`}
          >
            <div className="space-y-2">
              <Label htmlFor="name">نام و نام خانوادگی</Label>
              <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="نام خود را وارد کنید"
                  required
                  disabled={isFormDisabled}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">ایمیل</Label>
              <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  required
                  disabled={isFormDisabled}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">شماره تماس</Label>
              <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="09123456789"
                  required
                  disabled={isFormDisabled}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">پیام (اختیاری)</Label>
              <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="سوالات یا توضیحات اضافی..."
                  rows={3}
                  disabled={isFormDisabled}
              />
            </div>

            <div className="pt-4 border-t border-border">
              { workshop.price > 0 ?
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">هزینه کارگاه:</span>
                <span className="text-2xl font-bold">
                {workshop.price.toLocaleString("fa-IR")}{" "}
                  <span className="text-sm font-normal">تومان</span>
              </span>
              </div>
                  : <></>
              }
              <Button
                  type="submit"
                  className="w-full"
                  disabled={isFormDisabled}
              >
                {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                      در حال ثبت‌نام...
                    </>
                ) : (
                    "ثبت‌نام در کارگاه"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
  )
}