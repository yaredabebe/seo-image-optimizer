import { ImageOptions } from './types';

export class ImageOptimizer {
  private static instance: ImageOptimizer;
  private baseUrl: string = '';
  private cdnUrl: string = '';

  private constructor() {}

  public static getInstance(): ImageOptimizer {
    if (!ImageOptimizer.instance) {
      ImageOptimizer.instance = new ImageOptimizer();
    }
    return ImageOptimizer.instance;
  }

  public configure(baseUrl: string, cdnUrl?: string): void {
    this.baseUrl = baseUrl;
    this.cdnUrl = cdnUrl || baseUrl;
  }

  public optimize(imagePath: string, options: ImageOptions = {}): string {
    const {
      width,
      height,
      quality = 80,
      format = 'webp',
      sizes
    } = options;

    // Handle external URLs
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return this.optimizeExternalUrl(imagePath, { width, height, quality, format });
    }

    // Handle local images
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    const basePath = this.cdnUrl || this.baseUrl;

    // Build optimization parameters
    const params = new URLSearchParams();
    if (width) params.append('w', width.toString());
    if (height) params.append('h', height.toString());
    if (quality) params.append('q', quality.toString());
    if (format) params.append('fm', format);
    if (sizes) params.append('sizes', sizes);

    const queryString = params.toString();
    return queryString 
      ? `${basePath}${cleanPath}?${queryString}`
      : `${basePath}${cleanPath}`;
  }

  private optimizeExternalUrl(url: string, options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: string;
  }): string {
    // Example with a CDN like Cloudinary or Imgix
    // You can customize this based on your CDN
    const cdnBase = 'https://images.example.com/';
    const encodedUrl = encodeURIComponent(url);
    
    let cdnUrl = `${cdnBase}${encodedUrl}`;
    const params = [];

    if (options.width) params.push(`w=${options.width}`);
    if (options.height) params.push(`h=${options.height}`);
    if (options.quality) params.push(`q=${options.quality}`);
    if (options.format) params.push(`fm=${options.format}`);

    return params.length ? `${cdnUrl}?${params.join('&')}` : cdnUrl;
  }

  public generateSrcSet(imagePath: string, sizes: number[]): string {
    return sizes
      .map(size => `${this.optimize(imagePath, { width: size })} ${size}w`)
      .join(', ');
  }

  public getResponsiveImage(imagePath: string, options: ImageOptions = {}): {
    src: string;
    srcSet?: string;
    sizes?: string;
    loading?: 'lazy' | 'eager';
    alt?: string;
  } {
    const { lazy = true, alt, sizes, ...imgOptions } = options;

    const result: any = {
      src: this.optimize(imagePath, imgOptions),
      loading: lazy ? 'lazy' : 'eager',
      alt: alt || ''
    };

    if (sizes) {
      const defaultSizes = [320, 640, 768, 1024, 1280, 1536];
      result.srcSet = this.generateSrcSet(imagePath, defaultSizes);
      result.sizes = sizes;
    }

    return result;
  }

  public getImageAttributes(imagePath: string, options: ImageOptions = {}): Record<string, string> {
    const responsiveImage = this.getResponsiveImage(imagePath, options);
    
    const attributes: Record<string, string> = {
      src: responsiveImage.src,
      loading: responsiveImage.loading!,
      alt: responsiveImage.alt!
    };

    if (responsiveImage.srcSet) {
      attributes.srcSet = responsiveImage.srcSet;
    }

    if (responsiveImage.sizes) {
      attributes.sizes = responsiveImage.sizes;
    }

    return attributes;
  }
}