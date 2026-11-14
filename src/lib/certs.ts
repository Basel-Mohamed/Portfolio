import { CertificationItem } from '../types/portfolio';

export interface CertView extends CertificationItem {
  /** Course name without the issuer suffix. */
  name: string;
  /** Issuing institution, if it could be determined. */
  issuer?: string;
  year: number;
}

/** "Applied Deep Learning - MaharaTech (ITIMooca)" → { name: "Applied Deep Learning", issuer: "MaharaTech" } */
export function toCertView(cert: CertificationItem): CertView {
  const idx = cert.title.lastIndexOf(' - ');
  let name = cert.title;
  let issuer: string | undefined;
  if (idx > 0) {
    name = cert.title.slice(0, idx).trim();
    issuer = cert.title.slice(idx + 3).replace(/\s*\(.*?\)\s*/g, '').trim();
  } else if (/oracle|أوراكل/i.test(cert.title)) {
    issuer = /أوراكل/.test(cert.title) ? 'أوراكل' : 'Oracle';
  }
  const year = Number((cert.date.match(/\d{4}/) || [])[0]) || 0;
  return { ...cert, name, issuer, year };
}

export function uniqueIssuers(certs: CertView[]): string[] {
  return Array.from(new Set(certs.map(c => c.issuer).filter((x): x is string => !!x)));
}
