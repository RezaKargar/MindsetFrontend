"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, BookOpen, Users, MessageSquare, Mail, ImageIcon } from "lucide-react"

const menuItems = [
  { href: "/admin", label: "داشبورد", icon: LayoutDashboard },
  { href: "/admin/workshops", label: "کارگاه‌ها", icon: BookOpen },
  { href: "/admin/registrations", label: "ثبت‌نام‌ها", icon: Users },
  { href: "/admin/testimonials", label: "نظرات", icon: MessageSquare },
  { href: "/admin/contacts", label: "پیام‌ها", icon: Mail },
  { href: "/admin/carousel", label: "تصاویر اسلایدر", icon: ImageIcon },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-l bg-card min-h-[calc(100vh-73px)]">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                isActive ? "bg-primary text-primary-foreground" : "hover:bg-accent",
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
