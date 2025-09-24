import { RenderMode, ServerRoute } from '@angular/ssr';
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
    async getPrerenderParams() {
      return languageParams;
    },
  },
  {
    path: ':language/contacts',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return languageParams;
    },
  },
  {
    path: ':language/portfolio',
    renderMode: RenderMode.Server,
  },
  {
    path: ':language/admin',
    renderMode: RenderMode.Server,
  },
  {
    path: ':language/login',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return languageParams;
    },
  },
  {
    path: ':language/**',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return languageParams.map((p) => ({
        language: p.language,
        '**': '404',
      }));
    },
  },
];
