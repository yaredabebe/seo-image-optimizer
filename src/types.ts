export interface SEOConfig {
  title: string;
  description: string;
  image?: string;
  url?: string;
  siteName?: string;
  twitterHandle?: string;
  keywords?: string[];
  author?: string;
  robots?: {
    index?: boolean;
    follow?: boolean;
    noarchive?: boolean;
    nosnippet?: boolean;
  };
  canonical?: string;
  locale?: string;
  alternateLanguages?: Record<string, string>;
  jsonLd?: Record<string, any>;
  customMetaTags?: Array<{
    name?: string;
    property?: string;
    content: string;
  }>;
}

export interface ImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
  lazy?: boolean;
  priority?: boolean;
  alt?: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
}

export interface MetaTag {
  tag: string;
  attributes: Record<string, string>;
  content?: string;
}

export interface SEOContext {
  config: SEOConfig;
  metaTags: MetaTag[];
  jsonLd: Record<string, any>[];
}