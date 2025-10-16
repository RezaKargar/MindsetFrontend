export interface Workshop {
  id: string
  title: string
  slug: string
  description: string
  shortDescription: string
  type: "online" | "in-person"
  duration: string
  price: number
  instructor: string
  image_url: string
  images: string[]
  video_url?: string
  start_date: string
  end_date: string
  capacity: number
  enrolled: number
  topics: string[]
}

export const workshops: Workshop[] = [
  {
    id: "1",
    title: "مبانی برنامه‌نویسی و الگوریتم",
    slug: "programming-fundamentals",
    description:
      "در این کارگاه جامع، شما با مفاهیم پایه‌ای برنامه‌نویسی و الگوریتم‌ها آشنا خواهید شد. این دوره برای افرادی طراحی شده که می‌خواهند مسیر حرفه‌ای خود را در دنیای برنامه‌نویسی آغاز کنند.",
    shortDescription: "یادگیری مفاهیم پایه برنامه‌نویسی و الگوریتم‌ها",
    type: "in-person",
    duration: "8 هفته",
    price: 5000000,
    instructor: "دکتر محمد احمدی",
    image_url: "/programming-workshop.jpg",
    images: ["/programming-class-1.jpg", "/programming-class-2.jpg", "/programming-class-3.jpg"],
    start_date: "1403/12/01",
    end_date: "1403/12/01",
    capacity: 20,
    enrolled: 15,
    topics: ["متغیرها و انواع داده", "حلقه‌ها و شرط‌ها", "توابع", "ساختمان داده‌ها", "الگوریتم‌های پایه"],
  },
  {
    id: "2",
    title: "توسعه وب با React و Next.js",
    slug: "react-nextjs-workshop",
    description:
      "کارگاه پیشرفته توسعه وب با استفاده از React و Next.js. در این دوره یاد می‌گیرید چگونه اپلیکیشن‌های وب مدرن و کارآمد بسازید.",
    shortDescription: "ساخت اپلیکیشن‌های وب مدرن با React و Next.js",
    type: "online",
    duration: "10 هفته",
    price: 7000000,
    instructor: "مهندس سارا کریمی",
    image_url: "/react-nextjs-workshop.jpg",
    images: ["/web-development-1.jpg", "/web-development-concept.png", "/web-development-concept.png"],
    start_date: "1403/11/15",
    end_date: "1403/11/15",
    capacity: 30,
    enrolled: 25,
    topics: ["React Hooks", "Next.js App Router", "Server Components", "API Routes", "Deployment"],
  },
  {
    id: "3",
    title: "طراحی الگوهای نرم‌افزاری",
    slug: "software-design-patterns",
    description:
      "آشنایی با الگوهای طراحی نرم‌افزار و کاربرد آن‌ها در پروژه‌های واقعی. این کارگاه به شما کمک می‌کند کد تمیزتر و قابل نگهداری‌تر بنویسید.",
    shortDescription: "یادگیری الگوهای طراحی و معماری نرم‌افزار",
    type: "in-person",
    duration: "6 هفته",
    price: 6000000,
    instructor: "دکتر علی رضایی",
    image_url: "/software-design-patterns.jpg",
    images: ["/design-patterns-1.jpg", "/design-patterns-2.jpg", "/design-patterns-3.jpg"],
    start_date: "1403/12/10",
    end_date: "1403/12/10",
    capacity: 15,
    enrolled: 10,
    topics: ["Singleton", "Factory", "Observer", "Strategy", "SOLID Principles"],
  },
  {
    id: "4",
    title: "هوش مصنوعی و یادگیری ماشین",
    slug: "ai-machine-learning",
    description: "دوره جامع هوش مصنوعی و یادگیری ماشین با رویکرد عملی. از مبانی تا پیاده‌سازی پروژه‌های واقعی.",
    shortDescription: "آموزش عملی هوش مصنوعی و یادگیری ماشین",
    type: "online",
    duration: "12 هفته",
    price: 8000000,
    instructor: "دکتر فاطمه نوری",
    image_url: "/ai-machine-learning-workshop.jpg",
    images: ["/ai-class-1.jpg", "/ai-class-2.jpg", "/ai-class-3.jpg"],
    start_date: "1403/11/20",
    end_date: "1403/11/20",
    capacity: 25,
    enrolled: 20,
    topics: ["Neural Networks", "Deep Learning", "NLP", "Computer Vision", "TensorFlow"],
  },
]

export function getWorkshopBySlug(slug: string): Workshop | undefined {
  return workshops.find((workshop) => workshop.slug === slug)
}

export function getWorkshopsByType(type: "online" | "in-person"): Workshop[] {
  return workshops.filter((workshop) => workshop.type === type)
}

export function getWorkshopStatus(workshop: Workshop) {
  const now = new Date()
  const startDate = new Date(workshop.start_date)
  const endDate = new Date(workshop.end_date)

  const hasStarted = now >= startDate
  const hasEnded = now > endDate

  return {
    isUpcoming: now < startDate,
    isOngoing: hasStarted && !hasEnded,
    isEnded: hasEnded,
    // Registration is allowed only if workshop hasn't started yet
    // (adjust logic if you want to allow registration during the event)
    isRegistrationActive: now < startDate,
  }
}
