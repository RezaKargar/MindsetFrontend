import { CheckCircle2 } from "lucide-react"

interface WorkshopTopicsProps {
  topics: string[]
}

export function WorkshopTopics({ topics }: WorkshopTopicsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">سرفصل‌های کارگاه</h2>
      <div className="bg-card border border-border rounded-xl p-6">
        <ul className="space-y-3">
          {topics.map((topic, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-muted-foreground leading-relaxed">{topic}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
