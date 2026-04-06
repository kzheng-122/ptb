# Pawtobooth - Pet-Friendly Photo Booth Service

A modern, full-stack web application for Pawtobooth, a pet-friendly photo booth service built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern UI**: Clean, playful design with Tailwind CSS and shadcn/ui components
- **Cloudinary Integration**: Dynamic image fetching from Cloudinary folders
- **Portfolio Gallery**: Browse events with folder-based organization
- **Email Notifications**: Enquiry forms send emails via Resend
- **Mobile-First**: Responsive design optimized for all devices
- **Fast Performance**: Next.js App Router with optimized images

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Images**: Cloudinary API
- **Email**: Resend API
- **Deployment**: Vercel

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── about/             # About page
│   ├── enquiry/           # Contact form
│   ├── partners/          # Partners page
│   ├── portfolio/         # Portfolio pages
│   └── rates/             # Pricing page
├── components/            # Reusable components
│   ├── home/             # Homepage sections
│   ├── layout/           # Header/Footer
│   └── ui/               # UI components
├── lib/                  # Utilities
└── public/               # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pawtobooth
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Copy environment variables:
```bash
cp .env.example .env.local
```

4. Configure your environment variables in `.env.local`:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
EMAIL_TO=your-email@example.com
```

### Cloudinary Setup

1. Create a Cloudinary account
2. Create the following folders in your Media Library:
   - `home/` - Homepage gallery images
   - `portfolio/` - Subfolders for each event/portfolio
   - `partners/` - Partner logos
   - `about/` - About page images (optional)

### Development

Run the development server:

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📧 Email Configuration

The app uses Resend for email notifications. When someone submits the enquiry form:

1. Form data is validated
2. Email is sent to `EMAIL_TO` with formatted enquiry details
3. Success/error response is returned

## 🖼️ Image Management

Images are served from Cloudinary with automatic optimization:

- Auto format conversion
- Quality optimization
- Responsive sizing

### API Endpoints

- `GET /api/home-images` - Homepage gallery
- `GET /api/portfolio-folders` - Portfolio folder list
- `GET /api/portfolio-images?folder=name` - Images in specific folder
- `GET /api/partners` - Partner logos
- `GET /api/about-images` - About page images
- `POST /api/enquiry` - Submit enquiry form

## 🚀 Deployment to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables

Set these in your Vercel project settings:

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `RESEND_API_KEY`
- `EMAIL_TO`

## 📝 Pages

- **/** - Homepage with hero, gallery, highlights, testimonials
- **/portfolio** - Portfolio overview with folder cards
- **/portfolio/[folder]** - Individual portfolio gallery
- **/rates** - Pricing packages
- **/about** - About the service
- **/partners** - Partner logos
- **/enquiry** - Contact form

## 🎨 Design System

- **Colors**: Warm beige/white base with soft brown accents
- **Typography**: Clean sans-serif
- **Spacing**: Generous whitespace
- **Components**: Rounded corners, soft shadows, smooth animations

## 📱 Mobile Optimization

- Responsive grid layouts
- Touch-friendly interactions
- Optimized image loading
- Fast loading times

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is private and proprietary to Pawtobooth.