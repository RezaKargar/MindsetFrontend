export interface Testimonial {
  id: string
  name: string
  role: string
  company?: string
  image: string
  videoUrl: string
  videoThumbnail: string
  description: string
  workshop: string
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "علی محمدی",
    role: "توسعه‌دهنده فرانت‌اند",
    company: "دیجی‌کالا",
    image: "/testimonial-ali.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoThumbnail: "/testimonial-video-1.jpg",
    description:
      "کارگاه React و Next.js واقعاً تجربه فوق‌العاده‌ای بود. مدرس با تسلط کامل و روش تدریس عالی، مفاهیم پیچیده را به سادگی آموزش داد. الان توی شرکت از این مهارت‌ها استفاده می‌کنم.",
    workshop: "توسعه وب با React و Next.js",
  },
  {
    id: "2",
    name: "سارا احمدی",
    role: "مهندس نرم‌افزار",
    company: "اسنپ",
    image: "/testimonial-sara.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoThumbnail: "/testimonial-video-2.jpg",
    description:
      "من قبلاً هیچ تجربه‌ای در برنامه‌نویسی نداشتم. اما بعد از گذراندن کارگاه مبانی برنامه‌نویسی، الان می‌تونم پروژه‌های شخصی خودم رو بنویسم. واقعاً ممنونم از تیم آکادمی.",
    workshop: "مبانی برنامه‌نویسی و الگوریتم",
  },
  {
    id: "3",
    name: "محمد رضایی",
    role: "معماری نرم‌افزار",
    company: "کافه‌بازار",
    image: "/testimonial-mohammad.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoThumbnail: "/testimonial-video-3.jpg",
    description:
      "کارگاه الگوهای طراحی نرم‌افزار یکی از بهترین دوره‌هایی بود که تا حالا شرکت کردم. مفاهیم SOLID و Design Patterns رو خیلی خوب یاد گرفتم و الان کدهای تمیزتری می‌نویسم.",
    workshop: "طراحی الگوهای نرم‌افزاری",
  },
  {
    id: "4",
    name: "فاطمه کریمی",
    role: "دانشجوی کارشناسی",
    image: "/testimonial-fatemeh.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoThumbnail: "/testimonial-video-4.jpg",
    description:
      "کارگاه هوش مصنوعی فوق‌العاده بود! از صفر شروع کردیم و الان می‌تونم مدل‌های یادگیری ماشین بسازم. پروژه پایانی‌م رو هم با کمک این دوره انجام دادم.",
    workshop: "هوش مصنوعی و یادگیری ماشین",
  },
]
