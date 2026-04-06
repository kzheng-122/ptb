# Pawtobooth - Next.js Web Application

A modern, playful web application for Pawtobooth, a pet-friendly photography service.

## Project Overview

This is a full-stack application built with:
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with shadcn/ui
- **Images:** Cloudinary API
- **Email:** Resend API
- **Deployment:** Vercel

## Project Structure

```
pawtobooth/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (Next.js Route Handlers)
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── enquiry/           # Enquiry form
│   ├── rates/             # Pricing packages
│   ├── partners/          # Partner vendors
│   └── portfolio/         # Photo gallery
├── components/
│   ├── home/              # Home page components
│   ├── layout/            # Header, Footer
│   └── ui/                # Shadcn UI components
├── lib/                   # Utilities
├── public/                # Static assets
└── package.json
```

## Quick Start

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install
# or
pnpm install
```

### Environment Setup

```bash
# Copy environment file
cp .env.example .env.local

# Edit .env.local with your API keys
```

Required environment variables:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
EMAIL_TO=your-email@example.com
```

### Development

```bash
# Start development server
npm run dev
# or
pnpm dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Cloudinary Setup

1. Create a Cloudinary account at [cloudinary.com](https://cloudinary.com)
2. Get your cloud name, API key, and API secret
3. Create the following folders in your Media Library:
   - `home/` - Homepage gallery images
   - `portfolio/` - Subfolders for each event (e.g., `portfolio/wedding-2024`, `portfolio/birthday-party`)
   - `partners/` - Partner logos
   - `about/` - About page images (optional)

## Resend Email Setup

1. Create a Resend account at [resend.com](https://resend.com)
2. Get your API key
3. Verify your domain for sending emails
4. Set the `EMAIL_TO` environment variable to your email address

## Features

### Pages

1. **Home Page (/)** - Hero, gallery, highlights, testimonials, CTA
2. **Portfolio Page (/portfolio)** - Folder-based galleries
3. **Portfolio Detail (/portfolio/[folder])** - Individual event galleries
4. **Rates Page (/rates)** - Pricing packages (2h/3h/4h)
5. **About Page (/about)** - Company story and philosophy
6. **Partners Page (/partners)** - Partner logos
7. **Enquiry Page (/enquiry)** - Contact form with email notifications

### API Routes

All API routes are Next.js Route Handlers:

- `GET /api/home-images` - Homepage gallery images
- `GET /api/portfolio-folders` - Portfolio folder list
- `GET /api/portfolio-images?folder=name` - Images in specific folder
- `GET /api/partners` - Partner logos
- `GET /api/about-images` - About page images
- `POST /api/enquiry` - Submit enquiry (sends email)

## Deployment to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## Design System

**Colors:**
- Primary: Warm brown/beige tones
- Background: White/cream
- Text: Dark brown/charcoal

**Typography:**
- Headings: Serif font for elegance
- Body: Clean sans-serif

**UI Elements:**
- Rounded cards (rounded-2xl)
- Soft shadows
- Generous whitespace
- Playful, pet-friendly aesthetic

## Development Notes

- Images are optimized automatically via Next.js Image component
- API routes include caching for performance
- Email sending is optional - forms work without Resend configured
- All dynamic content comes from Cloudinary folders
- No database required - everything is static or API-driven
- `faqs` - FAQ entries
- `about_contents` - Editable content

## Design System

**Colors:**
- Primary: Sage green (#45804B approx in oklch)
- Accent: Warm beige/brown
- Background: Cream/off-white
- Text: Dark brown/charcoal

**Typography:**
- Headings: Playfair Display (serif)
- Body: DM Sans (sans-serif)

**UI Elements:**
- Rounded cards (rounded-2xl)
- Soft shadows
- Ample whitespace
- Playful, warm aesthetic

## Environment Variables

### Frontend
The frontend connects to the backend API. Configure the API URL if needed.

### Backend (.env)
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=pawtobooth
DB_SSLMODE=disable
PORT=8080
GIN_MODE=debug
FRONTEND_URL=http://localhost:3000
```

## Development Notes

- Frontend uses static data for demo, can be connected to backend API
- Backend includes auto-migration with GORM
- Seed data included for all tables
- CORS configured for localhost development
- Admin routes need authentication middleware for production
