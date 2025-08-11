export type Language = {
  code: string;
  src: string;
  label: string;
};

export const AVAILABLE_LANGUAGES: Language[] = [
  { code: 'en', src: '/images/flags/united-kingdom.png', label: 'English' },
  { code: 'pl', src: '/images/flags/poland.png', label: 'Polski' },
  { code: 'de', src: '/images/flags/germany.png', label: 'Deutsch' },
  { code: 'cz', src: '/images/flags/czech-republic.png', label: 'Čeština' },
  { code: 'ua', src: '/images/flags/ukraine.png', label: 'Українська' },
];

export const FALLBACK_LANGUAGE: Language = AVAILABLE_LANGUAGES[0];
