import { SEOConfig, MetaTag, SEOContext } from './types';
import { formatUrl, validateSEOConfig } from './utils';

export class SEOManager {
  private config: SEOConfig;
  private metaTags: MetaTag[] = [];
  private jsonLdItems: Record<string, any>[] = [];

  constructor(config: SEOConfig) {
    this.config = validateSEOConfig(config);
    this.generateMetaTags();
    this.generateJsonLd();
  }

  private generateMetaTags(): void {
    const tags: MetaTag[] = [];

    // Basic meta tags
    tags.push(
      { tag: 'title', attributes: {}, content: this.config.title },
      { tag: 'meta', attributes: { name: 'description', content: this.config.description } }
    );

    // Keywords
    if (this.config.keywords?.length) {
      tags.push({
        tag: 'meta',
        attributes: { name: 'keywords', content: this.config.keywords.join(', ') }
      });
    }

    // Author
    if (this.config.author) {
      tags.push({
        tag: 'meta',
        attributes: { name: 'author', content: this.config.author }
      });
    }

    // Robots
    if (this.config.robots) {
      const robotsContent = Object.entries(this.config.robots)
        .map(([key, value]) => value ? key : `no${key}`)
        .join(', ');
      
      tags.push({
        tag: 'meta',
        attributes: { name: 'robots', content: robotsContent }
      });
    }

    // Canonical URL
    if (this.config.canonical) {
      tags.push({
        tag: 'link',
        attributes: { rel: 'canonical', href: this.config.canonical }
      });
    }

    // Open Graph tags
    tags.push(
      { tag: 'meta', attributes: { property: 'og:title', content: this.config.title } },
      { tag: 'meta', attributes: { property: 'og:description', content: this.config.description } },
      { tag: 'meta', attributes: { property: 'og:type', content: 'website' } }
    );

    if (this.config.url) {
      tags.push({ tag: 'meta', attributes: { property: 'og:url', content: this.config.url } });
    }

    if (this.config.image) {
      tags.push({ tag: 'meta', attributes: { property: 'og:image', content: this.config.image } });
      tags.push({ tag: 'meta', attributes: { property: 'og:image:alt', content: this.config.title } });
    }

    if (this.config.siteName) {
      tags.push({ tag: 'meta', attributes: { property: 'og:site_name', content: this.config.siteName } });
    }

    if (this.config.locale) {
      tags.push({ tag: 'meta', attributes: { property: 'og:locale', content: this.config.locale } });
    }

    // Twitter Card
    tags.push(
      { tag: 'meta', attributes: { name: 'twitter:card', content: 'summary_large_image' } },
      { tag: 'meta', attributes: { name: 'twitter:title', content: this.config.title } },
      { tag: 'meta', attributes: { name: 'twitter:description', content: this.config.description } }
    );

    if (this.config.image) {
      tags.push({ tag: 'meta', attributes: { name: 'twitter:image', content: this.config.image } });
    }

    if (this.config.twitterHandle) {
      tags.push({ tag: 'meta', attributes: { name: 'twitter:site', content: this.config.twitterHandle } });
    }

    // Alternate languages
    if (this.config.alternateLanguages) {
      Object.entries(this.config.alternateLanguages).forEach(([lang, url]) => {
        tags.push({
          tag: 'link',
          attributes: { rel: 'alternate', hreflang: lang, href: url }
        });
      });
    }

    // Custom meta tags
    if (this.config.customMetaTags) {
      this.config.customMetaTags.forEach(customTag => {
        const attributes: Record<string, string> = {};
        if (customTag.name) attributes.name = customTag.name;
        if (customTag.property) attributes.property = customTag.property;
        attributes.content = customTag.content;
        
        tags.push({ tag: 'meta', attributes });
      });
    }

    this.metaTags = tags;
  }

  private generateJsonLd(): void {
    // Basic Organization schema
    if (this.config.siteName) {
      this.jsonLdItems.push({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: this.config.siteName,
        url: this.config.url,
        logo: this.config.image,
        description: this.config.description
      });
    }

    // WebPage schema
    this.jsonLdItems.push({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: this.config.title,
      description: this.config.description,
      url: this.config.url,
      mainEntityOfPage: this.config.url
    });

    // Custom JSON-LD
    if (this.config.jsonLd) {
      this.jsonLdItems.push({
        '@context': 'https://schema.org',
        ...this.config.jsonLd
      });
    }
  }

  public getMetaTags(): MetaTag[] {
    return this.metaTags;
  }

  public getJsonLd(): Record<string, any>[] {
    return this.jsonLdItems;
  }

  public getContext(): SEOContext {
    return {
      config: this.config,
      metaTags: this.metaTags,
      jsonLd: this.jsonLdItems
    };
  }

  public injectToDocument(): void {
    if (typeof document === 'undefined') return;

    // Update document title
    document.title = this.config.title;

    // Remove existing meta tags (optional)
    const existingMetaTags = document.querySelectorAll('meta[name], meta[property]');
    existingMetaTags.forEach(tag => {
      const metaTag = tag as HTMLMetaElement;
      if (!metaTag.getAttribute('data-seo-preserve')) {
        metaTag.remove();
      }
    });

    // Inject new meta tags
    this.metaTags.forEach(({ tag, attributes, content }) => {
      const element = document.createElement(tag);
      Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
      });
      if (content) {
        element.textContent = content;
      }
      document.head.appendChild(element);
    });

    // Inject JSON-LD
    this.jsonLdItems.forEach(item => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(item);
      document.head.appendChild(script);
    });
  }
}