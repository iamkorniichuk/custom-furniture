import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';
import { AVAILABLE_LANGUAGES } from './services/language';

const languageParams = Object.keys(AVAILABLE_LANGUAGES).map((language) => ({
  language,
}));

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: ':language',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.Server,
    async getPrerenderParams() {
      return languageParams;
    },
  },
  {
    path: ':language/contacts',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.Server,
    async getPrerenderParams() {
      return languageParams;
    },
  },
  {
    path: ':language/portfolio',
    renderMode: RenderMode.Server,
  },
  {
    path: ':language/**',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.Server,
    async getPrerenderParams() {
      return languageParams.map((p) => ({
        language: p.language,
        '**': '404',
      }));
    },
  },
];
