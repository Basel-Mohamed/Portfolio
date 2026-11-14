// Single source of truth for contact details and external links.
export const SITE = {
  email: 'baselmohamed937@gmail.com',
  /** Overall experience in AI, as stated on the CV. */
  yearsInAi: '3+',
  phoneDisplay: '+20 100 733 7686',
  phoneHref: 'tel:+201007337686',
  github: 'https://github.com/Basel-Mohamed',
  linkedin: 'https://www.linkedin.com/in/baselmohamed937/',
  cv: 'https://drive.usercontent.google.com/u/0/uc?id=1WSB26n9KoPU9PwXRLMNyqlzx2BxJa-oE&export=download',
} as const;

/** Fired on window to open the AI assistant from anywhere in the app. */
export const OPEN_CHAT_EVENT = 'portfolio:open-chat';
