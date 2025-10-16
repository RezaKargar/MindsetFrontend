import Link from "next/link"
import { Send, Linkedin, Youtube, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">M</span>
              </div>
              <span className="font-bold">Mindset Makers Academy</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              آکادمی مهندسی نرم‌افزار با رویکرد یادگیری عمیق و مفهومی از طریق روش‌های نوآورانه
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">دسترسی سریع</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/workshops" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  کارگاه‌ها
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  درباره ما
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  تماس با ما
                </Link>
              </li>
            </ul>
          </div>

          {/* Workshop Types */}
          <div>
            <h3 className="font-bold mb-4">نوع کارگاه‌ها</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">کارگاه‌های حضوری</li>
              <li className="text-sm text-muted-foreground">کارگاه‌های آنلاین</li>
              <li className="text-sm text-muted-foreground">دوره‌های تخصصی</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">ارتباط با ما</h3>
            <div className="flex gap-4">
              <a href="https://t.me/MindsetMakersAcademy" className="text-muted-foreground hover:text-accent transition-colors">
                <Send className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/azibom/" className="text-muted-foreground hover:text-accent transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Mindset Makers Academy. تمامی حقوق محفوظ است.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            ساخته شده با ❤️ توسط{" "}
            <a
                href="https://rezakargar.ir"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
            >
              RezaKargar
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
