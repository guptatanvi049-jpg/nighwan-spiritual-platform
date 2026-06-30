-- ==========================================
-- Database Schema for Nighwan Spiritual Platform
-- Execute this script in your Supabase SQL Editor
-- ==========================================

-- 1. Table for general page dynamic texts
CREATE TABLE IF NOT EXISTS public.page_contents (
    id TEXT PRIMARY KEY,
    page TEXT NOT NULL,
    section TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Table for Sacred Shrines (Temples)
CREATE TABLE IF NOT EXISTS public.temples (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    live_stream_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Table for Spiritual Events
CREATE TABLE IF NOT EXISTS public.events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    date DATE NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    status TEXT DEFAULT 'UPCOMING' CHECK (status IN ('UPCOMING', 'ONGOING', 'COMPLETED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Table for Media Gallery
CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT,
    category TEXT DEFAULT 'Ritual' CHECK (category IN ('Ritual', 'Temple', 'Festival', 'Community')),
    image_url TEXT NOT NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Table for Bookings (Puja Reservations)
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ritual_name TEXT NOT NULL,
    temple_name TEXT NOT NULL,
    pandit_name TEXT NOT NULL,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    user_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    payment_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Table for Contact Inquiries
CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- Enable Row Level Security (RLS) & Policies
-- ==========================================
ALTER TABLE public.page_contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.temples ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Anonymous public read policies
CREATE POLICY "Public Read Page Contents" ON public.page_contents FOR SELECT USING (true);
CREATE POLICY "Public Read Temples" ON public.temples FOR SELECT USING (true);
CREATE POLICY "Public Read Events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Public Read Gallery" ON public.gallery FOR SELECT USING (true);

-- Authenticated Admin write policies (Allows write/update access to admins)
CREATE POLICY "Admin Write Page Contents" ON public.page_contents FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Write Temples" ON public.temples FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Write Events" ON public.events FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Write Gallery" ON public.gallery FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Write Bookings" ON public.bookings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin Write Contacts" ON public.contacts FOR ALL USING (auth.role() = 'authenticated');

-- Anonymous write policies for contact form & bookings
CREATE POLICY "Anon Submit Contacts" ON public.contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Anon Submit Bookings" ON public.bookings FOR INSERT WITH CHECK (true);

-- ==========================================
-- Seed Initial Static Data
-- ==========================================

-- Home Page Contents
INSERT INTO public.page_contents (id, page, section, content) VALUES
('home_hero_title', 'home', 'hero', 'Connecting Devotion with Next-Gen Technology'),
('home_hero_sub', 'home', 'hero', 'Access verified Pandits, explore holy shrines digitally, generate computational AI birth charts, and stream live darshans.'),
('home_pillars_pledge', 'home', 'pledge', 'We pledge to allocate 15% of all digital booking commissions directly towards the restoration of neglected heritage temples, maintaining gaushalas, and supporting traditional Gurukuls.')
ON CONFLICT (id) DO UPDATE SET content = EXCLUDED.content;

-- About Page Contents
INSERT INTO public.page_contents (id, page, section, content) VALUES
('about_hero_title', 'about', 'hero', 'Bridging the Sacred & the Modern'),
('about_hero_sub', 'about', 'hero', 'We are a collective of Vedic Acharyas, technology architects, and software engineers unified by a single directive: to secure spiritual traditions through authentic systems.'),
('about_mission_title', 'about', 'mission', 'Devotional Authenticity, Tech Reliability'),
('about_mission_body', 'about', 'mission', 'Nighwan Technology Pvt. Ltd. was founded on the belief that geography or modern schedules shouldn''t restrict access to genuine Vedic worship. By standardizing pandit credentials, verifying scriptural protocols, and utilizing high-performance edge streaming networks, we ensure your devotion reaches the destination with absolute integrity.')
ON CONFLICT (id) DO UPDATE SET content = EXCLUDED.content;

-- Default Shrines (Temples)
INSERT INTO public.temples (name, location, description, image_url, live_stream_url) VALUES
('Kashi (Varanasi)', 'Ganga Banks, Varanasi', 'The ultimate hub of Shiva worship and liberation. Blessed with cosmic energy lines along the banks of River Ganga, making Pitru rites and Rudrabhishek uniquely powerful.', '/temple_kashi.jpg', 'https://www.youtube.com/embed/live_kashi_placeholder'),
('Gaya Kshetra', 'Falgu River, Gaya', 'Renowned as the historical pitru-kshetra. Devotees visit for offering Pind Daan and Shraddha rites on the banks of Falgu River, as performed by Lord Rama for Dasharatha.', '/temple_gaya.jpg', 'https://www.youtube.com/embed/live_gaya_placeholder'),
('Prayagraj Confluence', 'Triveni Sangam, Prayagraj', 'The holy confluence of Ganga, Yamuna, and mystical Saraswati. The sacred Triveni Sangam represents the cosmic womb where prayers for ancestor peace achieve supreme fruition.', '/temple_sangam.jpg', 'https://www.youtube.com/embed/live_sangam_placeholder')
ON CONFLICT DO NOTHING;

-- Default Events
INSERT INTO public.events (title, date, location, description, image_url, status) VALUES
('Maha Shivratri Maha Puja', '2026-03-06', 'Kashi Vishwanath Mandir', 'Participate digitally in the grand four-prahar Rudrabhishek on the auspicious night of Maha Shivratri.', '/event_shivratri.jpg', 'UPCOMING'),
('Shravan Somvar Aarti', '2026-07-20', 'Mahakaleshwar Temple, Ujjain', 'Special Bhasma Aarti streaming and custom Sankalpa bookings for Shravan somvars.', '/event_somvar.jpg', 'UPCOMING')
ON CONFLICT DO NOTHING;

-- Terms and Privacy placeholders
INSERT INTO public.page_contents (id, page, section, content) VALUES
('terms_body', 'terms', 'body', '# Terms & Conditions\n\nWelcome to Nighwan Technology. By accessing this platform, you agree to comply with our Vedic and digital booking regulations. All ritual services are administered in compliance with scriptural timelines.\n\n### 1. Booking & Sankalpa\nDevotees must provide authentic Gotra and Name for direct invocation representation during virtual rituals.'),
('privacy_body', 'privacy', 'body', '# Privacy Policy\n\nAt Nighwan, we safeguard your spiritual and transaction records with extreme sanctity. We do not sell or trade gotra, birth details, or billing transactions with third-party tracking networks.')
ON CONFLICT (id) DO UPDATE SET content = EXCLUDED.content;
