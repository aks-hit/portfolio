# Akshit Singh - Portfolio Website

A cutting-edge, modern portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion featuring advanced interactions and animations.

## ✨ Features

- **Advanced Animations**: Framer Motion for smooth, professional animations
- **Magnetic Buttons**: Interactive buttons that follow cursor movement
- **Custom Cursor Follower**: Dynamic cursor with pointer detection
- **Dark/Light Theme Toggle**: Smooth theme switching with persistent preferences
- **Glassmorphism Design**: Modern glass-effect UI components
- **Parallax Effects**: Floating elements and scroll-based animations
- **Responsive Design**: Fully responsive across all devices
- **Performance Optimized**: Fast loading and smooth interactions
- **Type-Safe**: Built with TypeScript for better development experience

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or create the project**
```bash
mkdir akshit-portfolio
cd akshit-portfolio
```

2. **Initialize the project**
```bash
npm init -y
```

3. **Install dependencies**
```bash
npm install next@14.0.4 react react-dom framer-motion lucide-react clsx tailwind-merge
npm install -D typescript @types/node @types/react @types/react-dom tailwindcss postcss autoprefixer
```

4. **Initialize Tailwind CSS**
```bash
npx tailwindcss init -p
```

5. **Create all the files from this artifact** following the structure:
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── about/page.tsx
│   ├── projects/page.tsx
│   ├── experience/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Section.tsx
│   ├── ProjectCard.tsx
│   ├── ExperienceCard.tsx
│   ├── MagneticButton.tsx
│   ├── FloatingCard.tsx
│   └── CursorFollower.tsx
├── data/
│   ├── projects.ts
│   └── experience.ts
└── lib/
    └── utils.ts
```

6. **Run development server**
```bash
npm run dev
```

Visit `http://localhost:3000` to see your portfolio!

## 🌐 Deploy to Vercel

### Method 1: Git Integration (Recommended)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js and configure everything
   - Click "Deploy"
   - Your site will be live in ~2 minutes! 🎉

### Method 2: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

Follow the prompts and your site will be deployed instantly!

## 🎨 Advanced Features Explained

### 1. Magnetic Buttons
Buttons that smoothly follow your cursor when you hover over them, creating an engaging interactive experience.

### 2. Custom Cursor Follower
A dual-layer cursor effect that responds to different UI elements, expanding on hover over clickable items.

### 3. Glassmorphism Effects
Modern frosted-glass aesthetic with backdrop blur and transparency for a premium feel.

### 4. Parallax Animations
Floating cards and elements that move at different speeds creating depth and visual interest.

### 5. Gradient Text
Dynamic gradient text animations that bring attention to important headings.

### 6. Smooth Page Transitions
Framer Motion animations for seamless navigation between pages.

### 7. Scroll-based Animations
Elements fade and slide into view as you scroll down the page.

### 8. Hover Effects
Interactive cards that transform and glow on hover with smooth transitions.

## 🎯 Customization

### Update Your Information

1. **Personal Data**: Edit `src/data/projects.ts` and `src/data/experience.ts`
2. **Contact Info**: Update email, phone, LinkedIn in components
3. **Colors**: Modify Tailwind config in `tailwind.config.ts`
4. **Animations**: Adjust Framer Motion variants in components

### Add New Sections

Create a new page in `src/app/your-section/page.tsx`:
```typescript
'use client';
import Section from '@/components/Section';

export default function YourSection() {
  return (
    <div className="pt-20">
      <Section title="Your Section">
        {/* Your content */}
      </Section>
    </div>
  );
}
```

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📄 License

MIT License - feel free to use this for your own portfolio!

## 🤝 Contributing

Feel free to fork, modify, and use for your own portfolio. If you make improvements, PRs are welcome!

## 📧 Contact

- **Email**: akshitsinghak@yahoo.com
- **LinkedIn**: [akshit-singh-007](https://linkedin.com/in/akshit-singh-007)
- **Phone**: +91-8787232180

---

Built with ❤️ by Akshit Singh