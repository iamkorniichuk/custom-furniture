import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { firstValueFrom } from 'rxjs';

import { routes } from './app.routes';
import { LanguageService } from './services/language';
import { NavbarStateService } from './services/navbar-state';

const languageInitializer = async () => {
  const languageService = inject(LanguageService);
  const languageCode = languageService.selectedLanguage().code;

  await firstValueFrom(languageService.translate.use(languageCode));
};

const navbarStateInitializer = () => {
  inject(NavbarStateService);
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(languageInitializer),
    provideAppInitializer(navbarStateInitializer),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/translations/',
        suffix: '.json',
      }),
      fallbackLang: 'en',
    }),
  ],
};
