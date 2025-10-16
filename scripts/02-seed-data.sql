-- Insert sample workshops
INSERT INTO workshops (slug, title, title_en, description, short_description, type, instructor, duration, price, start_date, capacity, level, image_url, topics, is_featured, is_published)
VALUES
  (
    'react-nextjs-workshop',
    'دوره جامع React و Next.js',
    'Complete React & Next.js Course',
    'در این دوره جامع، شما با مفاهیم پیشرفته React و Next.js آشنا می‌شوید و یاد می‌گیرید چگونه اپلیکیشن‌های مدرن و کارآمد بسازید.',
    'آموزش کامل React و Next.js از مبتدی تا پیشرفته',
    'online',
    'محمد احمدی',
    '8 هفته',
    2500000,
    NOW() + INTERVAL '2 weeks',
    30,
    'intermediate',
    '/react-nextjs-workshop.jpg',
    '["React Hooks", "Next.js App Router", "Server Components", "API Routes", "Authentication", "Deployment"]'::jsonb,
    true,
    true
  ),
  (
    'python-programming',
    'برنامه‌نویسی پایتون',
    'Python Programming',
    'دوره کامل برنامه‌نویسی پایتون برای مبتدیان و علاقه‌مندان به یادگیری این زبان قدرتمند.',
    'آموزش پایتون از صفر تا صد',
    'in-person',
    'سارا محمدی',
    '6 هفته',
    1800000,
    NOW() + INTERVAL '1 month',
    25,
    'beginner',
    '/programming-workshop.jpg',
    '["Python Basics", "Data Structures", "OOP", "File Handling", "APIs", "Projects"]'::jsonb,
    true,
    true
  ),
  (
    'javascript-fundamentals',
    'اصول جاوااسکریپت',
    'JavaScript Fundamentals',
    'یادگیری اصول و مبانی جاوااسکریپت برای توسعه وب مدرن.',
    'آموزش جامع JavaScript',
    'online',
    'علی رضایی',
    '5 هفته',
    1500000,
    NOW() + INTERVAL '3 weeks',
    40,
    'beginner',
    '/programming-class-1.jpg',
    '["ES6+", "DOM Manipulation", "Async/Await", "Promises", "Modules", "Best Practices"]'::jsonb,
    false,
    true
  );

-- Insert sample testimonials
INSERT INTO testimonials (name, role, company, content, avatar_url, rating, is_approved, is_featured)
VALUES
  (
    'علی محمدی',
    'توسعه‌دهنده فرانت‌اند',
    'شرکت فناوری نوآوران',
    'دوره React و Next.js واقعاً عالی بود. مدرس با تسلط کامل و روش تدریس ساده، مفاهیم پیچیده را به خوبی آموزش داد.',
    '/testimonial-ali.jpg',
    5,
    true,
    true
  ),
  (
    'سارا احمدی',
    'برنامه‌نویس پایتون',
    'استارتاپ تکنولوژی',
    'بهترین دوره‌ای که تا به حال شرکت کرده‌ام. محیط آموزشی عالی و پشتیبانی فوق‌العاده.',
    '/testimonial-sara.jpg',
    5,
    true,
    true
  );

-- Insert carousel images
INSERT INTO carousel_images (image_url, alt_text, order_index, is_active)
VALUES
  ('/programming-workshop.jpg', 'کارگاه برنامه‌نویسی', 1, true),
  ('/programming-class-1.jpg', 'کلاس برنامه‌نویسی 1', 2, true),
  ('/programming-class-2.jpg', 'کلاس برنامه‌نویسی 2', 3, true),
  ('/programming-class-3.jpg', 'کلاس برنامه‌نویسی 3', 4, true),
  ('/react-nextjs-workshop.jpg', 'کارگاه React و Next.js', 5, true);
