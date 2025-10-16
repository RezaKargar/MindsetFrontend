import { Users, BookOpen, Award, Clock } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "20+",
    label: "دانشجو",
  },
  {
    icon: BookOpen,
    value: "3",
    label: "کارگاه",
  },
  {
    icon: Award,
    value: "95%",
    label: "رضایت",
  },
  {
    icon: Clock,
    value: "20+",
    label: "ساعت آموزش",
  },
]

export function Stats() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
