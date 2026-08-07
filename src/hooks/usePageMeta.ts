import { useEffect } from 'react';

const SITE_URL = 'https://indoor-golf.ru';
const DEFAULT_IMAGE = `${SITE_URL}/apple-touch-icon.png`;

interface PageMetaOptions {
  path?: string;
  image?: string;
  noIndex?: boolean;
}

function setMeta(selector: string, attribute: 'name' | 'property', key: string, content: string) {
  let meta = document.querySelector<HTMLMetaElement>(selector);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, key);
    document.head.appendChild(meta);
  }
  meta.content = content;
}

export function usePageMeta(title: string, description: string, options: PageMetaOptions = {}) {
  useEffect(() => {
    document.title = title;

    const path = options.path ?? window.location.pathname;
    const canonicalUrl = new URL(path, SITE_URL).toString();
    const imageUrl = options.image
      ? new URL(options.image, SITE_URL).toString()
      : DEFAULT_IMAGE;

    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[name="robots"]', 'name', 'robots', options.noIndex ? 'noindex, nofollow' : 'index, follow');
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMeta('meta[property="og:image"]', 'property', 'og:image', imageUrl);
    setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', imageUrl);

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [description, options.image, options.noIndex, options.path, title]);
}
