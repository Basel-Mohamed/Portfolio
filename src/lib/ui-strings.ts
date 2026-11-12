import { useLanguage } from '../context/LanguageContext';

// Interface microcopy (labels, buttons, aria text). Portfolio content lives in data.ts.
const en = {
  skipToContent: 'Skip to content',
  openToWork: 'Open to new projects',
  downloadCv: 'Download CV',
  letsTalk: "Let's talk",
  viewAllProjects: 'View all projects',
  fullExperience: 'Full experience',
  currently: 'Currently',
  stats: {
    projects: 'Projects built',
    certs: 'Certifications',
    years: 'Years in AI',
  },
  sections: {
    whatIDo: 'What I do',
    whatIDoTitle: 'Four disciplines, one pipeline.',
    whatIDoLede: 'From research notebooks to production endpoints — the four areas I work across.',
    selectedWork: 'Selected work',
    selectedWorkLede: 'A few systems I am proud of, with the numbers that matter.',
    experience: 'Experience',
    credentials: 'Credentials',
    credentialsTitle: 'Always learning, always shipping.',
    credentialsLede: (n: number, k: number) =>
      `${n} professional certifications across AI, data and the web, from ${k} institutions.`,
    highlights: 'Highlights',
    viewAllCerts: 'View all certifications',
  },
  theme: { toLight: 'Switch to light theme', toDark: 'Switch to dark theme' },
  language: { label: 'عربي', switchTo: 'التبديل إلى العربية' },
  menu: { open: 'Open menu', close: 'Close menu' },
  footer: {
    pages: 'Pages',
    elsewhere: 'Elsewhere',
    backToTop: 'Back to top',
    rights: 'All rights reserved.',
  },
  project: {
    code: 'Code',
    live: 'Live demo',
    architecture: 'Architecture',
    nda: 'Under NDA',
    empty: 'No projects in this category yet.',
    tabs: { all: 'All', ai: 'AI & ML', fullstack: 'Full stack' },
    lede: 'Production AI pipelines, research prototypes and full stack products.',
  },
  arch: {
    title: 'System architecture',
    subtitle: 'End-to-end pipeline and data flow',
    overview: 'Overview',
    steps: 'Pipeline steps',
    close: 'Close',
  },
  certs: {
    all: 'All',
    view: 'View certificate',
    empty: 'No certifications in this category yet.',
    close: 'Close certificate',
    prev: 'Previous certificate',
    next: 'Next certificate',
    of: 'of',
    institutions: 'Institutions',
    latest: 'Most recent',
    highlightsLede: 'The ones I would point to first.',
    count: (n: number) => (n === 1 ? '1 certificate' : `${n} certificates`),
  },
  experience: {
    current: 'Current',
    lede: 'Roles across AI engineering, LLM training and web development.',
  },
  services: {
    lede: 'Ways I can help — from a single model to a production AI product.',
  },
  about: {
    toolkit: 'Toolkit',
    toolkitTitle: 'What I build with.',
    basedIn: 'Based in',
  },
  contact: {
    email: 'Email',
    phone: 'Phone',
    location: 'Location',
    copy: 'Copy email',
    copied: 'Email copied',
    regarding: "You're asking about",
    chatTitle: 'Prefer a quick answer?',
    chatDesc: 'My AI assistant knows my projects, skills and experience — ask it anything.',
    chatCta: 'Ask the assistant',
  },
  chat: {
    status: "Answers questions about Basel's work",
    open: 'Open AI assistant',
    close: 'Close chat',
    send: 'Send message',
    thinking: 'Thinking…',
  },
  notFound: {
    title: 'This page does not exist.',
    lede: 'The link may be broken or the page may have moved.',
  },
  error: {
    title: 'Something went wrong',
    fallback: 'An unexpected error occurred. Please try refreshing the page.',
    refresh: 'Refresh page',
    home: 'Go home',
  },
};

type UIStrings = typeof en;

const ar: UIStrings = {
  skipToContent: 'تخطي إلى المحتوى',
  openToWork: 'متاح لمشاريع جديدة',
  downloadCv: 'تحميل السيرة الذاتية',
  letsTalk: 'تواصل معي',
  viewAllProjects: 'عرض كل المشاريع',
  fullExperience: 'الخبرة الكاملة',
  currently: 'حالياً',
  stats: {
    projects: 'مشروع منجز',
    certs: 'شهادة مهنية',
    years: 'سنوات في الذكاء الاصطناعي',
  },
  sections: {
    whatIDo: 'ما أقدمه',
    whatIDoTitle: 'أربعة تخصصات، منظومة واحدة.',
    whatIDoLede: 'من دفاتر البحث إلى أنظمة الإنتاج — المجالات الأربعة التي أعمل بها.',
    selectedWork: 'أعمال مختارة',
    selectedWorkLede: 'مجموعة من الأنظمة التي أفخر بها، مع الأرقام المهمة.',
    experience: 'الخبرة',
    credentials: 'الشهادات',
    credentialsTitle: 'تعلّم مستمر، وتطبيق مستمر.',
    credentialsLede: (n: number, k: number) =>
      `${n} شهادة مهنية في الذكاء الاصطناعي والبيانات والويب، من ${k} جهة تعليمية.`,
    highlights: 'أبرز الشهادات',
    viewAllCerts: 'عرض كل الشهادات',
  },
  theme: { toLight: 'التبديل إلى الوضع الفاتح', toDark: 'التبديل إلى الوضع الداكن' },
  language: { label: 'EN', switchTo: 'Switch to English' },
  menu: { open: 'فتح القائمة', close: 'إغلاق القائمة' },
  footer: {
    pages: 'الصفحات',
    elsewhere: 'روابط',
    backToTop: 'العودة للأعلى',
    rights: 'جميع الحقوق محفوظة.',
  },
  project: {
    code: 'الكود',
    live: 'عرض مباشر',
    architecture: 'المعمارية',
    nda: 'محمي باتفاقية سرية',
    empty: 'لا توجد مشاريع في هذا التصنيف بعد.',
    tabs: { all: 'الكل', ai: 'الذكاء الاصطناعي', fullstack: 'تطوير الويب' },
    lede: 'خطوط ذكاء اصطناعي إنتاجية، ونماذج بحثية، ومنتجات ويب متكاملة.',
  },
  arch: {
    title: 'مخطط المعمارية',
    subtitle: 'مسار المعالجة وتدفق البيانات من البداية للنهاية',
    overview: 'نظرة عامة',
    steps: 'خطوات المعالجة',
    close: 'إغلاق',
  },
  certs: {
    all: 'الكل',
    view: 'عرض الشهادة',
    empty: 'لا توجد شهادات في هذا التصنيف بعد.',
    close: 'إغلاق الشهادة',
    prev: 'الشهادة السابقة',
    next: 'الشهادة التالية',
    of: 'من',
    institutions: 'جهة تعليمية',
    latest: 'الأحدث',
    highlightsLede: 'الشهادات التي أبدأ بها.',
    count: (n: number) => (n === 1 ? 'شهادة واحدة' : n === 2 ? 'شهادتان' : n <= 10 ? `${n} شهادات` : `${n} شهادة`),
  },
  experience: {
    current: 'حالي',
    lede: 'أدوار في هندسة الذكاء الاصطناعي، وتدريب النماذج اللغوية، وتطوير الويب.',
  },
  services: {
    lede: 'كيف يمكنني المساعدة — من نموذج واحد إلى منتج ذكاء اصطناعي متكامل.',
  },
  about: {
    toolkit: 'الأدوات والمهارات',
    toolkitTitle: 'الأدوات التي أبني بها.',
    basedIn: 'مقيم في',
  },
  contact: {
    email: 'البريد الإلكتروني',
    phone: 'الهاتف',
    location: 'الموقع',
    copy: 'نسخ البريد',
    copied: 'تم نسخ البريد',
    regarding: 'استفسارك بخصوص',
    chatTitle: 'تفضل إجابة سريعة؟',
    chatDesc: 'مساعدي الذكي يعرف مشاريعي ومهاراتي وخبراتي — اسأله أي شيء.',
    chatCta: 'اسأل المساعد',
  },
  chat: {
    status: 'يجيب عن أسئلتك حول أعمال باسل',
    open: 'فتح المساعد الذكي',
    close: 'إغلاق المحادثة',
    send: 'إرسال الرسالة',
    thinking: 'جارٍ التفكير…',
  },
  notFound: {
    title: 'هذه الصفحة غير موجودة.',
    lede: 'قد يكون الرابط غير صحيح أو تم نقل الصفحة.',
  },
  error: {
    title: 'حدث خطأ ما',
    fallback: 'حدث خطأ غير متوقع. يرجى تحديث الصفحة.',
    refresh: 'تحديث الصفحة',
    home: 'الرئيسية',
  },
};

const UI = { en, ar };

export function useUI(): UIStrings {
  const { language } = useLanguage();
  return UI[language];
}
