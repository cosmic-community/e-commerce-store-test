# E-Commerce Store

![E-Commerce Store](https://imgix.cosmicjs.com/034719f0-6e91-11f0-a051-23c10f41277a-photo-1505740420928-5e560c06d30e-1754022955111.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, fully-responsive e-commerce website built with Next.js that showcases your products, collections, and customer reviews. Features a clean, professional design with intuitive navigation and dynamic content management through Cosmic.

## Features

- 🛍️ **Product Catalog** - Beautiful grid layout with optimized product images and pricing
- 📂 **Collection Filtering** - Browse products by Electronics and Fashion categories
- ⭐ **Customer Reviews** - Display authentic reviews with star ratings and verification badges
- 📱 **Responsive Design** - Fully optimized for all device sizes
- 🚀 **Performance Optimized** - Fast loading with image optimization and efficient data fetching
- 🔍 **SEO Friendly** - Dynamic meta tags and structured data for better search visibility

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=688c4353382764db43c1fb31&clone_repository=688c46cf382764db43c1fb50)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Design a content model for an e-commerce store with products, collections, and customer reviews"

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Content Management**: Cosmic Headless CMS
- **Language**: TypeScript with strict type checking
- **Image Optimization**: Imgix integration
- **Font**: Inter (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with your content

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up your environment variables by adding them in your deployment platform:
   ```
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```

4. Run the development server:
   ```bash
   bun run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the application.

## Cosmic SDK Examples

### Fetching Products
```typescript
import { cosmic } from '@/lib/cosmic'

const products = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Reviews for a Product
```typescript
const reviews = await cosmic.objects
  .find({ 
    type: 'reviews',
    'metadata.product': productId 
  })
  .props(['id', 'title', 'metadata'])
  .depth(1)
```

### Filtering Products by Collection
```typescript
const fashionProducts = await cosmic.objects
  .find({ 
    type: 'products',
    'metadata.collection': collectionId 
  })
  .depth(1)
```

## Cosmic CMS Integration

This application integrates with your Cosmic bucket's content structure:

- **Products** - Displays your product catalog with images, pricing, and collection relationships
- **Collections** - Organizes products into Fashion and Electronics categories
- **Reviews** - Shows customer reviews with star ratings and verified purchase status

The app uses the Cosmic SDK to fetch data server-side for optimal performance and SEO.

## Deployment Options

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add your environment variables in the Vercel dashboard
3. Deploy automatically on every commit

### Netlify
1. Connect your repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard

For production, ensure all environment variables are properly configured in your hosting platform.

<!-- README_END -->