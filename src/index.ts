import { SEOManager } from './seo-manager';
import { ImageOptimizer } from './image-optimizer';
import { SEOConfig, ImageOptions } from './types';
import { generateSocialPreview } from './utils';

// Main SEO setup function
export function setupSEO(config: SEOConfig): void {
  // Validate and create SEO manager
  const seoManager = new SEOManager(config);
  
  // Generate preview in development
  if (process.env.NODE_ENV === 'development') {
    console.log(generateSocialPreview(config));
  }
  
  // Inject into document if in browser
  if (typeof window !== 'undefined') {
    seoManager.injectToDocument();
  }
  
  // For frameworks like Next.js, we return the manager for SSR
  return seoManager as any;
}

// Image optimization function
export function optimizeImage(
  imagePath: string, 
  options: ImageOptions = {}
): string {
  const optimizer = ImageOptimizer.getInstance();
  return optimizer.optimize(imagePath, options);
}

// Get responsive image attributes
export function getResponsiveImage(
  imagePath: string,
  options: ImageOptions = {}
): Record<string, string> {
  const optimizer = ImageOptimizer.getInstance();
  return optimizer.getImageAttributes(imagePath, options);
}

// Configure CDN or base URL for images
export function configureImageOptimizer(baseUrl: string, cdnUrl?: string): void {
  const optimizer = ImageOptimizer.getInstance();
  optimizer.configure(baseUrl, cdnUrl);
}

// React hook for client-side SEO (optional)
export function useSEO(config: SEOConfig): void {
  if (typeof window !== 'undefined') {
    setupSEO(config);
  }
}

// Next.js helper for getServerSideProps
export function getSEOProps(config: SEOConfig) {
  const seoManager = new SEOManager(config);
  return {
    metaTags: seoManager.getMetaTags(),
    jsonLd: seoManager.getJsonLd(),
    config: seoManager.getContext()
  };
}

// Export types
export type { SEOConfig, ImageOptions };