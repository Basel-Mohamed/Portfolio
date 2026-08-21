import { describe, it, expect } from 'vitest';
import { validatePayloadStructure } from '../UniversalDataEditor';

describe('Admin CMS - validatePayloadStructure', () => {
  it('rejects non-object or array payloads', () => {
    expect(validatePayloadStructure('projects', null).valid).toBe(false);
    expect(validatePayloadStructure('projects', 'string-payload').valid).toBe(false);
    expect(validatePayloadStructure('projects', [1, 2, 3]).valid).toBe(false);
  });

  describe('projects section validation', () => {
    it('validates a correct project payload', () => {
      const validProject = {
        title: 'Arabic OCR Engine',
        category: 'Vision & NLP',
        tech: ['Python', 'PyTorch', 'FastAPI'],
        description: 'End to end Arabic OCR pipeline.',
      };
      const result = validatePayloadStructure('projects', validProject);
      expect(result.valid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('rejects a project missing title or category', () => {
      const invalidProject = {
        tech: ['Python'],
      };
      const result = validatePayloadStructure('projects', invalidProject);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('title');
    });

    it('rejects a project where tech is not an array', () => {
      const invalidProject = {
        title: 'Project Title',
        category: 'AI',
        tech: 'Python, FastAPI',
      };
      const result = validatePayloadStructure('projects', invalidProject);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('tech');
    });
  });

  describe('experience section validation', () => {
    it('validates a complete experience entry', () => {
      const validExp = {
        title: 'AI Engineer',
        company: 'Freelance',
        period: '2024 - Present',
      };
      expect(validatePayloadStructure('experience', validExp).valid).toBe(true);
    });

    it('rejects experience entry missing company', () => {
      const invalidExp = {
        title: 'AI Engineer',
      };
      const result = validatePayloadStructure('experience', invalidExp);
      expect(result.valid).toBe(false);
      expect(result.error).toContain('company');
    });
  });

  describe('certifications section validation', () => {
    it('validates certification with title and date', () => {
      const validCert = {
        title: 'Applied Deep Learning',
        date: '2024',
      };
      expect(validatePayloadStructure('certifications', validCert).valid).toBe(true);
    });

    it('rejects certification missing date', () => {
      const invalidCert = {
        title: 'Applied Deep Learning',
      };
      expect(validatePayloadStructure('certifications', invalidCert).valid).toBe(false);
    });
  });
});
