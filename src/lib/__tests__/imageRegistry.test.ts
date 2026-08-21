import { describe, it, expect } from 'vitest';
import { resolveImage } from '../imageRegistry';

describe('imageRegistry - resolveImage', () => {
  it('returns empty string when given empty or falsy input', () => {
    expect(resolveImage('')).toBe('');
    expect(resolveImage(null as unknown as string)).toBe('');
    expect(resolveImage(undefined as unknown as string)).toBe('');
  });

  it('returns absolute URLs untouched', () => {
    const httpUrl = 'https://supabase.co/storage/v1/object/public/portfolio-assets/project.webp';
    expect(resolveImage(httpUrl)).toBe(httpUrl);
  });

  it('returns root-relative paths untouched', () => {
    const rootPath = '/profile_pic.png';
    expect(resolveImage(rootPath)).toBe(rootPath);
  });

  it('resolves valid registered project keys to imported asset paths', () => {
    const resolved = resolveImage('ocr');
    expect(resolved).toBeTruthy();
    expect(typeof resolved).toBe('string');
  });

  it('resolves valid registered certificate keys to imported asset paths', () => {
    const resolved = resolveImage('applied-deep-learning');
    expect(resolved).toBeTruthy();
    expect(typeof resolved).toBe('string');
  });

  it('falls back to the raw key string if key is unregistered', () => {
    const unknownKey = 'non-existent-project-key-xyz';
    expect(resolveImage(unknownKey)).toBe(unknownKey);
  });
});
