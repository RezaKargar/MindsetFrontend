"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

type Contact = {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: string
  created_at: string
}

export default function ContactsTable({ contacts }: { contacts: Contact[] }) {
  const router = useRouter()
  const supabase = getSupabaseBrowserClient()
  const [updating, setUpdating] = useState<string | null>(null)

  const handleStatusChange = async (id: string, status: string) => {
    setUpdating(id)
    await supabase.from("contact_submissions").update({ status }).eq("id", id)
    setUpdating(null)
    router.refresh()
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      new: "default",
      read: "secondary",
      replied: "outline",
    }
    const labels: Record<string, string> = {
      new: "جدید",
      read: "خوانده شده",
      replied: "پاسخ داده شده",
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
            <TableHead>موضوع</TableHead>
            <TableHead>تاریخ</TableHead>
            <TableHead>وضعیت</TableHead>
            <TableHead className="text-left">عملیات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell className="font-medium">{contact.name}</TableCell>
              <TableCell dir="ltr" className="text-right">
                {contact.email}
              </TableCell>
              <TableCell>{contact.subject}</TableCell>
              <TableCell>{new Date(contact.created_at).toLocaleDateString("fa-IR")}</TableCell>
              <TableCell>{getStatusBadge(contact.status)}</TableCell>
              <TableCell className="text-left">
                <div className="flex gap-2 justify-end">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{contact.subject}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground">از: {contact.name}</p>
                          <p className="text-sm text-muted-foreground" dir="ltr">
                            {contact.email}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm whitespace-pre-wrap">{contact.message}</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Select
                    value={contact.status}
                    onValueChange={(value) => handleStatusChange(contact.id, value)}
                    disabled={updating === contact.id}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">جدید</SelectItem>
                      <SelectItem value="read">خوانده شده</SelectItem>
                      <SelectItem value="replied">پاسخ داده شده</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
