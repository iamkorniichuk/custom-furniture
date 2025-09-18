import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { firstValueFrom } from 'rxjs';

import { routes } from './app.routes';
import { LanguageService } from './services/language';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

const languageInitializer = async () => {
  const languageService = inject(LanguageService);
  const languageCode = languageService.selectedLanguage().code;

  await firstValueFrom(languageService.translate.use(languageCode));
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(languageInitializer),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/translations/',
        suffix: '.json',
      }),
      fallbackLang: 'en',
    }),
    provideClientHydration(withEventReplay()),
  ],
};
