"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Workshop = {
  id?: string
  slug: string
  title: string
  title_en?: string
  description: string
  short_description?: string
  type: string
  instructor: string
  instructor_bio?: string
  duration: string
  price: number
  start_date?: string
  capacity?: number
  level?: string
  image_url?: string
  video_url?: string
  topics?: string[]
  is_featured: boolean
  is_published: boolean
}

export default function WorkshopForm({ workshop }: { workshop?: Workshop }) {
  const router = useRouter()
  const supabase = getSupabaseBrowserClient()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<Workshop>(
    workshop || {
      slug: "",
      title: "",
      description: "",
      type: "online",
      instructor: "",
      duration: "",
      price: 0,
      is_featured: false,
      is_published: true,
    },
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (workshop?.id) {
        await supabase.from("workshops").update(formData).eq("id", workshop.id)
      } else {
        await supabase.from("workshops").insert([formData])
      }

      router.push("/admin/workshops")
      router.refresh()
    } catch (error) {
      console.error("Error saving workshop:", error)
      alert("خطا در ذخیره کارگاه")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="title">عنوان فارسی *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="title_en">عنوان انگلیسی</Label>
          <Input
            id="title_en"
            value={formData.title_en || ""}
            onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
            dir="ltr"
          />
        </div>

        <div>
          <Label htmlFor="slug">شناسه URL *</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
            dir="ltr"
          />
        </div>

        <div>
          <Label htmlFor="type">نوع کارگاه *</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="online">آنلاین</SelectItem>
              <SelectItem value="in-person">حضوری</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="instructor">مدرس *</Label>
          <Input
            id="instructor"
            value={formData.instructor}
            onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="duration">مدت زمان *</Label>
          <Input
            id="duration"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="price">قیمت (تومان) *</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            required
          />
        </div>

        <div>
          <Label htmlFor="capacity">ظرفیت</Label>
          <Input
            id="capacity"
            type="number"
            value={formData.capacity || ""}
            onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
          />
        </div>

        <div>
          <Label htmlFor="level">سطح</Label>
          <Select value={formData.level || ""} onValueChange={(value) => setFormData({ ...formData, level: value })}>
            <SelectTrigger>
              <SelectValue placeholder="انتخاب کنید" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">مبتدی</SelectItem>
              <SelectItem value="intermediate">متوسط</SelectItem>
              <SelectItem value="advanced">پیشرفته</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="start_date">تاریخ شروع</Label>
          <Input
            id="start_date"
            type="datetime-local"
            value={formData.start_date || ""}
            onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
            dir="ltr"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="short_description">توضیحات کوتاه</Label>
        <Textarea
          id="short_description"
          value={formData.short_description || ""}
          onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
          rows={2}
        />
      </div>

      <div>
        <Label htmlFor="description">توضیحات کامل *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          rows={6}
        />
      </div>

      <div>
        <Label htmlFor="instructor_bio">بیوگرافی مدرس</Label>
        <Textarea
          id="instructor_bio"
          value={formData.instructor_bio || ""}
          onChange={(e) => setFormData({ ...formData, instructor_bio: e.target.value })}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="image_url">آدرس تصویر</Label>
          <Input
            id="image_url"
            value={formData.image_url || ""}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            dir="ltr"
          />
        </div>

        <div>
          <Label htmlFor="video_url">آدرس ویدیو</Label>
          <Input
            id="video_url"
            value={formData.video_url || ""}
            onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
            dir="ltr"
          />
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex items-center gap-2">
          <Switch
            id="is_published"
            checked={formData.is_published}
            onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
          />
          <Label htmlFor="is_published">منتشر شده</Label>
        </div>

        <div className="flex items-center gap-2">
          <Switch
            id="is_featured"
            checked={formData.is_featured}
            onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
          />
          <Label htmlFor="is_featured">کارگاه ویژه</Label>
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? "در حال ذخیره..." : "ذخیره کارگاه"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/workshops")}>
          انصراف
        </Button>
      </div>
    </form>
  )
}
