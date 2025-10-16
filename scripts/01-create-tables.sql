-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Workshops table
CREATE TABLE IF NOT EXISTS workshops (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  title_en TEXT,
  description TEXT NOT NULL,
  short_description TEXT,
  type TEXT NOT NULL CHECK (type IN ('online', 'in-person')),
  instructor TEXT NOT NULL,
  instructor_bio TEXT,
  duration TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  capacity INTEGER,
  enrolled INTEGER DEFAULT 0,
  level TEXT CHECK (level IN ('beginner', 'intermediate', 'advanced')),
  image_url TEXT,
  video_url TEXT,
  topics JSONB DEFAULT '[]'::jsonb,
  gallery JSONB DEFAULT '[]'::jsonb,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workshop_id UUID REFERENCES workshops(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  education_level TEXT,
  experience_level TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT,
  content TEXT NOT NULL,
  video_url TEXT,
  thumbnail_url TEXT,
  avatar_url TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  is_approved BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Carousel images table
CREATE TABLE IF NOT EXISTS carousel_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  alt_text TEXT,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_workshops_slug ON workshops(slug);
CREATE INDEX IF NOT EXISTS idx_workshops_type ON workshops(type);
CREATE INDEX IF NOT EXISTS idx_workshops_featured ON workshops(is_featured);
CREATE INDEX IF NOT EXISTS idx_registrations_workshop ON registrations(workshop_id);
CREATE INDEX IF NOT EXISTS idx_registrations_email ON registrations(email);
CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON testimonials(is_approved);
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_submissions(status);

-- Enable Row Level Security
ALTER TABLE workshops ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE carousel_images ENABLE ROW LEVEL SECURITY;

-- Public read access for published workshops
CREATE POLICY "Public can view published workshops"
  ON workshops FOR SELECT
  USING (is_published = true);

-- Public read access for approved testimonials
CREATE POLICY "Public can view approved testimonials"
  ON testimonials FOR SELECT
  USING (is_approved = true);

-- Public read access for active carousel images
CREATE POLICY "Public can view active carousel images"
  ON carousel_images FOR SELECT
  USING (is_active = true);

-- Public can insert registrations
CREATE POLICY "Public can create registrations"
  ON registrations FOR INSERT
  WITH CHECK (true);

-- Public can insert contact submissions
CREATE POLICY "Public can create contact submissions"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

-- Admin full access (authenticated users)
CREATE POLICY "Authenticated users have full access to workshops"
  ON workshops FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users have full access to registrations"
  ON registrations FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users have full access to testimonials"
  ON testimonials FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users have full access to contact submissions"
  ON contact_submissions FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users have full access to carousel images"
  ON carousel_images FOR ALL
  USING (auth.role() = 'authenticated');
