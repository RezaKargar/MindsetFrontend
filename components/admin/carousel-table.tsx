"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Trash2 } from "lucide-react"
import Image from "next/image"

type CarouselImage = {
  id: string
  image_url: string
  alt_text: string | null
  order_index: number
  is_active: boolean
}

export default function CarouselTable({ images }: { images: CarouselImage[] }) {
  const router = useRouter()
  const supabase = getSupabaseBrowserClient()
  const [updating, setUpdating] = useState<string | null>(null)

  const handleToggle = async (id: string, value: boolean) => {
    setUpdating(id)
    await supabase.from("carousel_images").update({ is_active: value }).eq("id", id)
    setUpdating(null)
    router.refresh()
  }

  const handleDelete = async (id: string) => {
    if (!confirm("آیا از حذف این تصویر اطمینان دارید؟")) return
    await supabase.from("carousel_images").delete().eq("id", id)
    router.refresh()
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>تصویر</TableHead>
            <TableHead>متن جایگزین</TableHead>
            <TableHead>ترتیب</TableHead>
            <TableHead>فعال</TableHead>
            <TableHead className="text-left">عملیات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {images.map((image) => (
            <TableRow key={image.id}>
              <TableCell>
                <div className="relative w-20 h-12">
                  <Image
                    src={image.image_url || "/placeholder.svg"}
                    alt={image.alt_text || "تصویر"}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              </TableCell>
              <TableCell>{image.alt_text || "-"}</TableCell>
              <TableCell>{image.order_index}</TableCell>
              <TableCell>
                <Switch
                  checked={image.is_active}
                  onCheckedChange={(checked) => handleToggle(image.id, checked)}
                  disabled={updating === image.id}
                />
              </TableCell>
              <TableCell className="text-left">
                <Button variant="outline" size="sm" onClick={() => handleDelete(image.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
