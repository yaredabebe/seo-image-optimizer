//utils ts

import { SEOConfig } from './types';

export function validateSEOConfig(config: SEOConfig): SEOConfig {
  if (!config.title) {
    throw new Error('SEO config must include a title');
  }
  
  if (!config.description) {
    throw new Error('SEO config must include a description');
  }

  // Truncate title if too long (60 chars is optimal for search results)
  if (config.title.length > 60) {
    console.warn(`SEO: Title "${config.title}" is too long (${config.title.length} chars). Consider shortening to under 60 characters.`);
  }

  // Truncate description if too long (160 chars is optimal for search results)
  if (config.description.length > 160) {
    console.warn(`SEO: Description is too long (${config.description.length} chars). Consider shortening to under 160 characters.`);
  }

  return config;
}

export function formatUrl(url: string, baseUrl?: string): string {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  if (baseUrl) {
    const cleanBase = baseUrl.replace(/\/$/, '');
    const cleanUrl = url.replace(/^\//, '');
    return `${cleanBase}/${cleanUrl}`;
  }
  
  return url;
}

export function generateSocialPreview(config: SEOConfig): string {
  const preview = `
    🔍 SEO Preview:
    ┌─────────────────────────────────────────┐
    │ ${config.title.substring(0, 56)}${config.title.length > 56 ? '...' : ''}
    ├─────────────────────────────────────────┤
    │ ${config.description.substring(0, 156)}${config.description.length > 156 ? '...' : ''}
    └─────────────────────────────────────────┘
    ${config.image ? `📷 Image: ${config.image}` : ''}
    ${config.url ? `🔗 URL: ${config.url}` : ''}
  `;
  
  return preview;
}