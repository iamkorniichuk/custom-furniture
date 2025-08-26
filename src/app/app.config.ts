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
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';

import { routes } from './app.routes';
import { LanguageService } from './services/language';
import { environment } from '../environments/environment';

export const languageInitializer = async () => {
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
    provideHttpClient(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/translations/',
        suffix: '.json',
      }),
      fallbackLang: 'en',
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
  ],
};
