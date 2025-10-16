"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2 } from "lucide-react"
import Link from "next/link"

type Workshop = {
  id: string
  title: string
  type: string
  instructor: string
  price: number
  enrolled: number
  capacity: number
  is_published: boolean
  is_featured: boolean
}

export default function WorkshopsTable({ workshops }: { workshops: Workshop[] }) {
  const router = useRouter()
  const supabase = getSupabaseBrowserClient()
  const [deleting, setDeleting] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm("آیا از حذف این کارگاه اطمینان دارید؟")) return

    setDeleting(id)
    await supabase.from("workshops").delete().eq("id", id)
    setDeleting(null)
    router.refresh()
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>عنوان</TableHead>
            <TableHead>نوع</TableHead>
            <TableHead>مدرس</TableHead>
            <TableHead>قیمت</TableHead>
            <TableHead>ظرفیت</TableHead>
            <TableHead>وضعیت</TableHead>
            <TableHead className="text-left">عملیات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workshops.map((workshop) => (
            <TableRow key={workshop.id}>
              <TableCell className="font-medium">{workshop.title}</TableCell>
              <TableCell>
                <Badge variant={workshop.type === "online" ? "default" : "secondary"}>
                  {workshop.type === "online" ? "آنلاین" : "حضوری"}
                </Badge>
              </TableCell>
              <TableCell>{workshop.instructor}</TableCell>
              <TableCell>{workshop.price.toLocaleString("fa-IR")} تومان</TableCell>
              <TableCell>
                {workshop.enrolled} / {workshop.capacity}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {workshop.is_published && <Badge>منتشر شده</Badge>}
                  {workshop.is_featured && <Badge variant="secondary">ویژه</Badge>}
                </div>
              </TableCell>
              <TableCell className="text-left">
                <div className="flex gap-2 justify-end">
                  <Link href={`/admin/workshops/${workshop.id}`}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(workshop.id)}
                    disabled={deleting === workshop.id}
                  >
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
