# IMPLEMENTATION.md - Technical Implementation Guide
## 360ace Unified Landing Page

**Version:** 1.0  
**Last Updated:** October 4, 2025  
**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Project Setup](#project-setup)
3. [Configuration Files](#configuration-files)
4. [Component Implementation](#component-implementation)
5. [Styling Guide](#styling-guide)
6. [Data Management](#data-management)
7. [API Implementation](#api-implementation)
8. [Testing Strategy](#testing-strategy)
9. [Performance Optimization](#performance-optimization)
10. [Deployment Guide](#deployment-guide)

---

## Quick Start

```bash
# 1. Create Next.js app
npx create-next-app@latest 360ace --typescript --tailwind --app --eslint

# 2. Navigate to directory
cd 360ace

# 3. Install dependencies
npm install framer-motion lucide-react react-hook-form zod @hookform/resolvers/zod clsx tailwind-merge next-seo nodemailer

# 4. Install dev dependencies
npm install -D @types/nodemailer

# 5. Initialize shadcn/ui
npx shadcn@latest init

# 6. Add shadcn components
npx shadcn@latest add button card input textarea form label select

# 7. Create project structure
mkdir -p src/components/{ui,sections,shared,forms}
mkdir -p src/{lib,hooks,types,data}
mkdir -p public/{images,videos,fonts}
mkdir -p docs

# 8. Start development server
npm run dev
```

---

## Project Setup

### 1. Initial Next.js Configuration

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.360ace.net',
      },
    ],
  },
  
  compress: true,
  reactStrictMode: true,
  
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;
```

### 2. TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 3. Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=contact@360ace.net
```

```bash
# .env.local.example (commit this)
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_GA_ID=

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
CONTACT_EMAIL=
```

---

## Configuration Files

### 1. Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0A1628',
          blue: '#00D4FF',
          orange: '#FF6B35',
        },
        food: {
          orange: '#FF8C42',
          green: '#2DCC70',
          cream: '#FFF8F0',
        },
        tech: {
          cyan: '#00E5FF',
          purple: '#8B5CF6',
          gray: '#1F2937',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 212, 255, 0.6)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
```

### 2. ESLint Configuration

```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "next/typescript"
  ],
  "rules": {
    "react/no-unescaped-entities": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
```

### 3. Prettier Configuration

```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false
}
```

---

## Component Implementation

### Core Utilities

```typescript
// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

```typescript
// src/lib/constants.ts
export const SITE_CONFIG = {
  name: '360ace',
  description: 'Excellence in Food & Technology Services',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://360ace.net',
  ogImage: '/images/og-image.jpg',
  links: {
    food: 'https://360ace.food',
    tech: 'https://360ace.net/tech',
    linkedin: 'https://linkedin.com/company/360ace',
    twitter: 'https://twitter.com/360ace',
  },
};

export const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Food', href: '#food' },
  { label: 'Tech', href: '#tech' },
  { label: 'Contact', href: '#contact' },
] as const;
```

### Custom Hooks

```typescript
// src/hooks/useInView.ts
import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useInView(options: UseInViewOptions = {}) {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isInView] as const;
}
```

```typescript
// src/hooks/useScrollPosition.ts
import { useEffect, useState } from 'react';

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollPosition = () => {
      const currentScrollY = window.scrollY;
      setScrollPosition(currentScrollY);
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', updateScrollPosition, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollPosition);
  }, []);

  return { scrollPosition, scrollDirection };
}
```

### Shared Components

```typescript
// src/components/shared/Navigation.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NAV_ITEMS } from '@/lib/constants';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-brand-navy/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-white">
          360ace
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className="text-white hover:text-brand-blue transition-colors"
            >
              {item.label}
            </button>
          ))}
          <Button className="bg-brand-blue hover:bg-brand-blue/80">Get Started</Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-brand-navy/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-white hover:text-brand-blue transition-colors text-left"
              >
                {item.label}
              </button>
            ))}
            <Button className="bg-brand-blue hover:bg-brand-blue/80 w-full">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
```

```typescript
// src/components/shared/ScrollProgress.tsx
'use client';

import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      setProgress(scrolled);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-gray-800">
      <div
        className="h-full bg-gradient-to-r from-brand-blue to-brand-orange transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
```

```typescript
// src/components/shared/AnimatedSection.tsx
'use client';

import { useInView } from '@/hooks/useInView';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade' | 'slide' | 'scale';
}

export function AnimatedSection({
  children,
  className = '',
  animation = 'fade',
}: AnimatedSectionProps) {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const animations = {
    fade: 'transition-opacity duration-700',
    slide: 'transition-all duration-700',
    scale: 'transition-all duration-700',
  };

  const inViewStyles = {
    fade: 'opacity-100',
    slide: 'opacity-100 translate-y-0',
    scale: 'opacity-100 scale-100',
  };

  const outViewStyles = {
    fade: 'opacity-0',
    slide: 'opacity-0 translate-y-10',
    scale: 'opacity-0 scale-95',
  };

  return (
    <div
      ref={ref}
      className={`${className} ${animations[animation]} ${
        isInView ? inViewStyles[animation] : outViewStyles[animation]
      }`}
    >
      {children}
    </div>
  );
}
```

### Section Components

```typescript
// src/components/sections/Hero.tsx
'use client';

import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SITE_CONFIG } from '@/lib/constants';

export function Hero() {
  const scrollToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-navy via-gray-900 to-brand-navy overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-orange rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Where{' '}
            <span className="bg-gradient-to-r from-food-orange to-food-green bg-clip-text text-transparent">
              Flavor
            </span>{' '}
            Meets{' '}
            <span className="bg-gradient-to-r from-tech-cyan to-tech-purple bg-clip-text text-transparent">
              Innovation
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            360ace delivers excellence in both culinary experiences and cutting-edge technology
            solutions. One brand, two worlds of expertise.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-food-orange hover:bg-food-orange/80 text-white text-lg px-8 py-6"
              onClick={() => window.open(SITE_CONFIG.links.food, '_blank')}
            >
              Explore Food Services
            </Button>
            <Button
              size="lg"
              className="bg-tech-cyan hover:bg-tech-cyan/80 text-white text-lg px-8 py-6"
              onClick={() => window.open(SITE_CONFIG.links.tech, '_blank')}
            >
              Explore Tech Solutions
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={() => scrollToSection('#about')}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
        aria-label="Scroll to content"
      >
        <ArrowDown className="text-white w-8 h-8" />
      </button>
    </section>
  );
}
```

```typescript
// src/components/sections/Footer.tsx
import { SITE_CONFIG, NAV_ITEMS } from '@/lib/constants';
import { Linkedin, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">360ace</h3>
            <p className="text-gray-400 mb-4">
              Excellence in Food & Technology Services
            </p>
            <div className="flex gap-4">
              <a
                href={SITE_CONFIG.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-blue transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={SITE_CONFIG.links.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-blue transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-blue transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Food Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Food Services</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={SITE_CONFIG.links.food}
                  target="_blank"
                  className="text-gray-400 hover:text-brand-blue transition-colors"
                >
                  Visit 360ace.Food
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-brand-blue transition-colors">
                  Corporate Catering
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-brand-blue transition-colors">
                  Event Management
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-brand-blue transition-colors">
                  Meal Planning
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Tech Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Tech Services</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={SITE_CONFIG.links.tech}
                  target="_blank"
                  className="text-gray-400 hover:text-brand-blue transition-colors"
                >
                  Visit 360ace.Tech
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-brand-blue transition-colors">
                  Software Development
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-brand-blue transition-colors">
                  Cloud Infrastructure
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-brand-blue transition-colors">
                  Digital Consulting
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() =>
                      document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="text-gray-400 hover:text-brand-blue transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2025 360ace. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-brand-blue transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-brand-blue transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-brand-blue transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

### Form Components

```typescript
// src/components/forms/ContactForm.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2, Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  interest: z.enum(['food', 'tech', 'both', 'general']),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  consent: z.boolean().refine((val) => val === true, 'You must agree to be contacted'),
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interest: 'general',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setError('Failed to send message. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12 bg-green-50 rounded-lg">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2 text-gray-900">Thank You!</h3>
        <p className="text-gray-600">We'll be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          {...register('name')}
          placeholder="John Doe"
          className="w-full mt-1"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder="john@example.com"
          className="w-full mt-1"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          {...register('phone')}
          placeholder="+1 (555) 123-4567"
          className="w-full mt-1"
        />
      </div>

      <div>
        <Label htmlFor="interest">I'm interested in *</Label>
        <Select
          onValueChange={(value) => setValue('interest', value as any)}
          defaultValue="general"
        >
          <SelectTrigger className="w-full mt-1">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General Inquiry</SelectItem>
            <SelectItem value="food">Food Services</SelectItem>
            <SelectItem value="tech">Tech Services</SelectItem>
            <SelectItem value="both">Both Services</SelectItem>
          </SelectContent>
        </Select>
        {errors.interest && (
          <p className="text-red-500 text-sm mt-1">{errors.interest.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="message">Your Message *</Label>
        <Textarea
          id="message"
          {...register('message')}
          placeholder="Tell us about your project or inquiry..."
          rows={5}
          className="w-full mt-1"
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="consent"
          {...register('consent')}
          className="mt-1"
        />
        <Label htmlFor="consent" className="text-sm text-gray-600 cursor-pointer">
          I agree to be contacted by 360ace regarding my inquiry.
        </Label>
      </div>
      {errors.consent && (
        <p className="text-red-500 text-sm">{errors.consent.message}</p>
      )}

      {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brand-blue hover:bg-brand-blue/80"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </Button>
    </form>
  );
}
```

---

## Data Management

```typescript
// src/data/services.ts
export const services = [
  {
    id: 'food-1',
    category: 'food',
    title: 'Corporate Catering',
    description: 'Premium catering solutions for corporate events, meetings, and daily office needs.',
    icon: 'utensils',
  },
  {
    id: 'food-2',
    category: 'food',
    title: 'Event Management',
    description: 'Complete event planning and management with culinary excellence.',
    icon: 'calendar',
  },
  {
    id: 'food-3',
    category: 'food',
    title: 'Meal Planning',
    description: 'Customized meal plans and nutrition consulting for health-conscious clients.',
    icon: 'clipboard',
  },
  {
    id: 'tech-1',
    category: 'tech',
    title: 'Software Development',
    description: 'Custom software solutions built with modern technologies and best practices.',
    icon: 'code',
  },
  {
    id: 'tech-2',
    category: 'tech',
    title: 'Cloud Infrastructure',
    description: 'Scalable cloud solutions and infrastructure management for businesses.',
    icon: 'cloud',
  },
  {
    id: 'tech-3',
    category: 'tech',
    title: 'Digital Transformation',
    description: 'Strategic consulting to modernize and optimize your digital operations.',
    icon: 'trending-up',
  },
];
```

```typescript
// src/data/testimonials.ts
export const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    title: 'CEO',
    company: 'TechCorp Inc',
    division: 'tech',
    quote: 'The technical expertise and professionalism displayed by 360ace transformed our digital infrastructure. Outstanding service!',
    image: '/images/testimonials/sarah.jpg',
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'Operations Manager',
    company: 'Global Events Ltd',
    division: 'food',
    quote: 'Our corporate events have never been better. 360ace food services exceeded all expectations with their attention to detail.',
    image: '/images/testimonials/michael.jpg',
  },
  // Add more testimonials...
];
```

---

## API Implementation

```typescript
// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  interest: z.enum(['food', 'tech', 'both', 'general']),
  message: z.string().min(10),
  consent: z.boolean().refine((val) => val === true),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Create email transporter
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL,
      subject: `New Contact Form Submission - ${validatedData.interest.toUpperCase()}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Phone:</strong> ${validatedData.phone || 'Not provided'}</p>
        <p><strong>Interest:</strong> ${validatedData.interest}</p>
        <p><strong>Message:</strong></p>
        <p>${validatedData.message}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">
          Submitted from 360ace.net on ${new Date().toLocaleString()}
        </p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
```

---

## Main Page Implementation

```typescript
// src/app/page.tsx
import { Hero } from '@/components/sections/Hero';
import { Footer } from '@/components/sections/Footer';
import { Navigation } from '@/components/shared/Navigation';
import { ScrollProgress } from '@/components/shared/ScrollProgress';

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navigation />
      <main>
        <Hero />
        {/* Add other sections here as you build them */}
        <section id="about" className="py-20">
          {/* About content */}
        </section>
        <section id="services" className="py-20">
          {/* Services content */}
        </section>
        <section id="food" className="py-20">
          {/* Food showcase */}
        </section>
        <section id="tech" className="py-20">
          {/* Tech showcase */}
        </section>
        <section id="contact" className="py-20">
          {/* Contact form */}
        </section>
      </main>
      <Footer />
    </>
  );
}
```

```typescript
// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SITE_CONFIG } from '@/lib/constants';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} - ${SITE_CONFIG.description}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: ['food services', 'technology solutions', 'catering', 'software development'],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  metadataBase: new URL(SITE_CONFIG.url),
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.description,
    description: SITE_CONFIG.description,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} Brand`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.description,
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
```

---

## Performance Optimization

### Image Optimization

```typescript
// Always use Next.js Image component
import Image from 'next/image';

<Image
  src="/images/hero.jpg"
  alt="360ace services"
  width={1920}
  height={1080}
  priority // For above-the-fold images
  placeholder="blur"
  blurDataURL="data:image/..." // Generate blur data
/>
```

### Code Splitting

```typescript
// Dynamic imports for heavy components
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  