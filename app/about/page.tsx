import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Users, Target, Award, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-card border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">درباره Mindset Makers Academy</h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                ما یک آکادمی مهندسی نرم‌افزار هستیم که با رویکرد یادگیری عمیق و مفهومی، به دانشجویان کمک می‌کنیم تا
                مهارت‌های واقعی برنامه‌نویسی را فرا بگیرند.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">ماموریت ما</h2>
              <p className="text-muted-foreground leading-relaxed">
                ماموریت ما ارائه آموزش‌های با کیفیت و عمیق در حوزه مهندسی نرم‌افزار است. ما معتقدیم که یادگیری باید مفهومی
                و عملی باشد، نه صرفاً حفظ کردن کدها.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">چشم‌انداز ما</h2>
              <p className="text-muted-foreground leading-relaxed">
                چشم‌انداز ما تبدیل شدن به بهترین آکادمی آموزش برنامه‌نویسی در ایران است که دانشجویان با تفکر انتقادی و
                مهارت‌های عملی تربیت می‌کند.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">ارزش‌های ما</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              اصولی که در تمام فعالیت‌های ما راهنمای ماست
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Users className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">یادگیری عمیق</h3>
              <p className="text-muted-foreground leading-relaxed">تمرکز بر درک عمیق مفاهیم به جای حفظ کردن سطحی</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Target className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">آموزش عملی</h3>
              <p className="text-muted-foreground leading-relaxed">پروژه‌محور و کاربردی با تمرین‌های واقعی</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">حمایت مستمر</h3>
              <p className="text-muted-foreground leading-relaxed">پشتیبانی و راهنمایی در تمام مراحل یادگیری</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
