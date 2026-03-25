import { useEffect } from 'react';

const SITE_URL = 'https://portfolio-tan-three-jio5dda2ea.vercel.app';
const DEFAULT_IMAGE = `${SITE_URL}/profile_pic.png`;

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: string;
}

/**
 * useSEO - Dynamically updates <head> meta tags for every page.
 * Works at runtime (client-side) to ensure Google and other crawlers
 * that execute JavaScript pick up unique per-page metadata.
 */
export function useSEO({
  title,
  description,
  url,
  image = DEFAULT_IMAGE,
  type = 'website',
}: SEOProps) {
  useEffect(() => {
    const canonicalUrl = url ? `${SITE_URL}${url}` : SITE_URL;

    // --- Title ---
    document.title = title;

    // --- Helper to set/create a meta tag ---
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        const [attrName, attrVal] = selector.replace('[', '').replace(']', '').split('=');
        // Strip quotes from value if present
        el.setAttribute(attrName, attrVal ? attrVal.replace(/"/g, '') : attr);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    // --- Helper to set/create a link tag ---
    const setLink = (rel: string, href: string) => {
      let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // Standard meta
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[name="title"]', 'content', title);

    // Canonical
    setLink('canonical', canonicalUrl);

    // Open Graph
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', canonicalUrl);
    setMeta('meta[property="og:image"]', 'content', image);
    setMeta('meta[property="og:type"]', 'content', type);

    // Twitter / X  (use name="twitter:*", not property)
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[name="twitter:image"]', 'content', image);
    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMeta('meta[name="twitter:url"]', 'content', canonicalUrl);
  }, [title, description, url, image, type]);
}
