# 🚀 SEO Image Optimizer

<div align="center">

**Automatic SEO meta tags and image optimization for modern web apps.**

[![npm version](https://badge.fury.io/js/seo-image-optimizer.svg)](https://badge.fury.io/js/seo-image-optimizer)[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)[![Bundle Size](https://img.shields.io/bundlephobia/minzip/seo-image-optimizer)](https://bundlephobia.com/package/seo-image-optimizer)



</div>

---

## ✨ Why SEO Image Optimizer?

Stop wasting hours manually configuring meta tags, Open Graph images, and responsive images. This package does it all automatically with just **2 lines of code**.

### 🎯 What Makes It Special?

- **Automatic Meta Tags** - Generates 20+ SEO tags automatically
- **Smart Image Optimization** - WebP conversion, responsive images, lazy loading
-  **JSON-LD Structured Data** - Boost search rankings with schema.org markup
-  **Zero Configuration** - Works out of the box with sensible defaults
-  **Framework Agnostic** - Works with React, Next.js, Vue, Svelte, or vanilla JS
-  **Responsive Images** - Automatic srcset generation for all devices
-  **Multi-language Support** - Hreflang tags for international SEO
-  **TypeScript Ready** - Full type definitions included

---

## 📦 Installation
### npm
```bash
npm install seo-image-optimizer
```
### yarn
```bash
yarn add seo-image-optimizer
```
### pnpm
```bash
pnpm add seo-image-optimizer
```
## Quick Start

### Basic Usage (2 lines of code!)

```typescript

import { setupSEO, optimizeImage } from 'seo-image-optimizer';
setupSEO({
 title: "johnsales- Find Your Dream Home",
 description: "The best rental platform in wakanda with 1000+ verified properties",
 image: optimizeImage("/images/hero.jpg", { width: 1200, height: 630 }),
 url: "https://johnsales.com",
});
```
That's it! This single function automatically generates:

-   ✅ Title & Meta Description
    
-   ✅ Open Graph Tags (Facebook, LinkedIn)
    
-   ✅ Twitter Cards
    
-   ✅ Canonical URLs
    
-   ✅ Robots Meta Tags
    
-   ✅ JSON-LD Structured Data
    
-   ✅ And 20+ other SEO tags!

##  Real-World Examples

### Example 1: E-commerce Product Page
```typescript
import { setupSEO, optimizeImage } from 'seo-image-optimizer';

setupSEO({
  title: "MacBook Pro M3 - Apple Official Store",
  description: "Latest MacBook Pro with M3 chip, 16GB RAM, 512GB SSD. Free shipping in wakanda .",
  image: optimizeImage("/products/macbook-pro.jpg", { 
    width: 1200, 
    height: 630,
    quality: 95 
  }),
  url: "https://store.johnsales.com/product/macbook-pro-m3",
  siteName: "johnsalesStore",
  twitterHandle: "@johnsales",
  keywords: ["macbook", "apple", "laptop", "m3 chip", "wakanda"],
  jsonLd: {
    "@type": "Product",
    "name": "MacBook Pro M3",
    "brand": "Apple",
    "offers": {
      "@type": "Offer",
      "price": "2499",
      "priceCurrency": "USD"
    }
  }
});
```
### Example 2: Blog Article with Featured Image
```typescript
import { setupSEO, getResponsiveImage } from 'seo-image-optimizer';

// SEO Setup
setupSEO({
  title: "10 Tips for First-Time Home Renters in wakanda ",
  description: "Essential guide for renting your first apartment in Addis Ababa. Learn about prices, contracts, and neighborhoods.",
  image: optimizeImage("/blog/renting-guide.jpg", { width: 1200, height: 630 }),
  url: "https://johnsales.com/blog/renting-tips",
  author: "Biniyam Alemu",
  keywords: ["renting tips", "addis ababa", "first time renter", "wakanda real estate"]
});

// Responsive Blog Image
function BlogImage() {
  const imgProps = getResponsiveImage('/blog/renting-guide.jpg', {
    sizes: '(max-width: 768px) 100vw, 800px',
    lazy: true,
    alt: 'Beautiful apartment in Addis Ababa with modern furniture'
  });
  
  return <img {...imgProps} className="blog-image" />;
}
```
### Example 3: Next.js 14+ App Router
```typescript
// app/layout.tsx
import { setupSEO, configureImageOptimizer } from 'seo-image-optimizer';

// Configure CDN for images
configureImageOptimizer(
  'https://johnsales.com',
  'https://cdn.johnsales.com' // Optional CDN
);

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            ${setupSEO({
              title: "johnsales- wakanda 's #1 Rental Platform",
              description: "Find apartments, houses, and commercial spaces for rent in wakanda ",
              image: "/images/og-image.jpg",
              url: "https://johnsales.com",
              siteName: "johnsales"
            })}
          `
        }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
```
## Features

-    Automatic meta tags (Open Graph, Twitter Cards)
    
-    Smart image optimization (WebP, responsive)
    
-    JSON-LD structured data
    
-    Zero configuration
    
-    Framework agnostic
    
-    ~8KB bundle size
