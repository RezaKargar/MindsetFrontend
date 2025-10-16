"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Instagram, Linkedin, CheckCircle2, Send } from "lucide-react"

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Contact form data:", formData)
    setIsSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-card border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">تماس با ما</h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                سوالی دارید؟ دوست دارید بیشتر بدانید؟ با ما در ارتباط باشید
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>اطلاعات تماس</CardTitle>
                  <CardDescription>راه‌های ارتباطی با آکادمی</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">ایمیل</h3>
                      <p className="text-sm text-muted-foreground">mrsh13610@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Send className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">تلفن</h3>
                      <p className="text-sm text-muted-foreground">
                        <a href="https://t.me/azibom">@azibom</a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">آدرس</h3>
                      <p className="text-sm text-muted-foreground"></p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>شبکه‌های اجتماعی</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <a
                      href="https://t.me/MindsetMakersAcademy"
                      className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                    >
                      <Send className="w-5 h-5 text-primary" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/azibom/"
                      className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                    >
                      <Linkedin className="w-5 h-5 text-primary" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>فرم تماس</CardTitle>
                  <CardDescription>پیام خود را برای ما ارسال کنید</CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center space-y-4 py-8">
                      <div className="flex justify-center">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <CheckCircle2 className="w-8 h-8 text-primary" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold">پیام شما ارسال شد!</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        از تماس شما متشکریم. به زودی با شما ارتباط خواهیم گرفت.
                      </p>
                      <Button onClick={() => setIsSubmitted(false)}>ارسال پیام جدید</Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">نام و نام خانوادگی</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="نام خود را وارد کنید"
                            required
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
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subject">موضوع</Label>
                          <Input
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="موضوع پیام"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">پیام</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="پیام خود را بنویسید..."
                          rows={6}
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full">
                        ارسال پیام
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
