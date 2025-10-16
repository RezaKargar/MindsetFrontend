"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Registration = {
  id: string
  full_name: string
  email: string
  phone: string
  status: string
  created_at: string
  workshops: { title: string }
}

export default function RegistrationsTable({
  registrations,
}: {
  registrations: Registration[]
}) {
  const router = useRouter()
  const supabase = getSupabaseBrowserClient()
  const [updating, setUpdating] = useState<string | null>(null)

  const handleStatusChange = async (id: string, status: string) => {
    setUpdating(id)
    await supabase.from("registrations").update({ status }).eq("id", id)
    setUpdating(null)
    router.refresh()
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      pending: "secondary",
      confirmed: "default",
      cancelled: "destructive",
    }
    const labels: Record<string, string> = {
      pending: "در انتظار",
      confirmed: "تایید شده",
      cancelled: "لغو شده",
    }
    return <Badge variant={variants[status]}>{labels[status]}</Badge>
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>نام</TableHead>
            <TableHead>ایمیل</TableHead>
            <TableHead>تلفن</TableHead>
            <TableHead>کارگاه</TableHead>
            <TableHead>تاریخ</TableHead>
            <TableHead>وضعیت</TableHead>
            <TableHead className="text-left">تغییر وضعیت</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {registrations.map((reg) => (
            <TableRow key={reg.id}>
              <TableCell className="font-medium">{reg.full_name}</TableCell>
              <TableCell dir="ltr" className="text-right">
                {reg.email}
              </TableCell>
              <TableCell dir="ltr" className="text-right">
                {reg.phone}
              </TableCell>
              <TableCell>{reg.workshops.title}</TableCell>
              <TableCell>{new Date(reg.created_at).toLocaleDateString("fa-IR")}</TableCell>
              <TableCell>{getStatusBadge(reg.status)}</TableCell>
              <TableCell className="text-left">
                <Select
                  value={reg.status}
                  onValueChange={(value) => handleStatusChange(reg.id, value)}
                  disabled={updating === reg.id}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">در انتظار</SelectItem>
                    <SelectItem value="confirmed">تایید</SelectItem>
                    <SelectItem value="cancelled">لغو</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
