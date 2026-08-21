import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSEO } from '../useSEO';

describe('useSEO Hook', () => {
  beforeEach(() => {
    document.title = '';
    document.head.innerHTML = '';
  });

  it('correctly sets document title and standard meta tags', () => {
    renderHook(() =>
      useSEO({
        title: 'Projects - Basel Mohamed',
        description: 'Explore AI engineering projects and architectures.',
        url: '/projects',
      })
    );

    expect(document.title).toBe('Projects - Basel Mohamed');

    const descMeta = document.querySelector('meta[name="description"]');
    expect(descMeta?.getAttribute('content')).toBe('Explore AI engineering projects and architectures.');

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    expect(canonicalLink?.getAttribute('href')).toBe('https://baselmohamed.com/projects');
  });

  it('correctly sets Open Graph and Twitter Card tags', () => {
    renderHook(() =>
      useSEO({
        title: 'About - Basel Mohamed',
        description: 'About Basel Mohamed, AI Engineer.',
        url: '/about',
        image: 'https://baselmohamed.com/custom.png',
        type: 'profile',
      })
    );

    const ogTitle = document.querySelector('meta[property="og:title"]');
    expect(ogTitle?.getAttribute('content')).toBe('About - Basel Mohamed');

    const ogDesc = document.querySelector('meta[property="og:description"]');
    expect(ogDesc?.getAttribute('content')).toBe('About Basel Mohamed, AI Engineer.');

    const ogType = document.querySelector('meta[property="og:type"]');
    expect(ogType?.getAttribute('content')).toBe('profile');

    const ogImage = document.querySelector('meta[property="og:image"]');
    expect(ogImage?.getAttribute('content')).toBe('https://baselmohamed.com/custom.png');

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    expect(twitterTitle?.getAttribute('content')).toBe('About - Basel Mohamed');

    const twitterCard = document.querySelector('meta[name="twitter:card"]');
    expect(twitterCard?.getAttribute('content')).toBe('summary_large_image');
  });
});
