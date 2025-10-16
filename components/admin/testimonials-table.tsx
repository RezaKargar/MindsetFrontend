"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Edit, Trash2 } from "lucide-react"
import Link from "next/link"

type Testimonial = {
  id: string
  name: string
  role: string
  content: string
  is_approved: boolean
  is_featured: boolean
  created_at: string
}

export default function TestimonialsTable({
  testimonials,
}: {
  testimonials: Testimonial[]
}) {
  const router = useRouter()
  const supabase = getSupabaseBrowserClient()
  const [updating, setUpdating] = useState<string | null>(null)

  const handleToggle = async (id: string, field: "is_approved" | "is_featured", value: boolean) => {
    setUpdating(id)
    await supabase
      .from("testimonials")
      .update({ [field]: value })
      .eq("id", id)
    setUpdating(null)
    router.refresh()
  }

  const handleDelete = async (id: string) => {
    if (!confirm("آیا از حذف این نظر اطمینان دارید؟")) return
    await supabase.from("testimonials").delete().eq("id", id)
    router.refresh()
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>نام</TableHead>
            <TableHead>نقش</TableHead>
            <TableHead>محتوا</TableHead>
            <TableHead>تایید شده</TableHead>
            <TableHead>ویژه</TableHead>
            <TableHead className="text-left">عملیات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {testimonials.map((testimonial) => (
            <TableRow key={testimonial.id}>
              <TableCell className="font-medium">{testimonial.name}</TableCell>
              <TableCell>{testimonial.role}</TableCell>
              <TableCell className="max-w-md truncate">{testimonial.content}</TableCell>
              <TableCell>
                <Switch
                  checked={testimonial.is_approved}
                  onCheckedChange={(checked) => handleToggle(testimonial.id, "is_approved", checked)}
                  disabled={updating === testimonial.id}
                />
              </TableCell>
              <TableCell>
                <Switch
                  checked={testimonial.is_featured}
                  onCheckedChange={(checked) => handleToggle(testimonial.id, "is_featured", checked)}
                  disabled={updating === testimonial.id}
                />
              </TableCell>
              <TableCell className="text-left">
                <div className="flex gap-2 justify-end">
                  <Link href={`/admin/testimonials/${testimonial.id}`}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(testimonial.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
