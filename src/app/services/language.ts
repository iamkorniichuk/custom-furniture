import { inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, first } from 'rxjs';

export interface Language {
  code: string;
  src: string;
  label: string;
}

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private LANGUAGE_KEY = 'language';
  readonly availableLanguages: Record<string, Language> = {
    en: {
      code: 'en',
      src: '/images/flags/united-kingdom.png',
      label: 'English',
    },
    pl: { code: 'pl', src: '/images/flags/poland.png', label: 'Polski' },
    de: { code: 'de', src: '/images/flags/germany.png', label: 'Deutsch' },
    cz: {
      code: 'cz',
      src: '/images/flags/czech-republic.png',
      label: 'Čeština',
    },
    ua: { code: 'ua', src: '/images/flags/ukraine.png', label: 'Українська' },
  };
  readonly fallbackLanguageCode = 'en';
  readonly selectedLanguage = signal(
    this.availableLanguages[this.fallbackLanguageCode],
  );

  public translate = inject(TranslateService);
  private router = inject(Router);
  constructor() {
    this.translate.addLangs(Object.keys(this.availableLanguages));
    this.translate.setFallbackLang(this.fallbackLanguageCode);

    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        first(),
      )
      .subscribe(() => {
        const currentLanguageCode = this.extractCurrentLanguageCode();
        this.setLanguage(currentLanguageCode);
        this.navigateToCurrentLanguage();

        this.router.events
          .pipe(filter((e) => e instanceof NavigationEnd))
          .subscribe(() => {
            const routeLanguageCode = this.getRouteLanguageCode();
            if (
              this.isSuitableLanguageCode(routeLanguageCode) &&
              routeLanguageCode !== this.translate.getCurrentLang()
            ) {
              this.setLanguage(routeLanguageCode);
            }
          });
      });
  }

  private getCurrentUrlSegments(): string[] {
    const path = this.router.url.split(/[?#]/)[0];
    const segments = path.split('/').filter(Boolean);
    return segments;
  }

  private withLanguageSegment(
    languageCode: string,
    segments: string[],
  ): string[] {
    if (this.isSuitableLanguageCode(segments[0])) {
      segments = segments.slice(1);
    }
    return [languageCode, ...segments];
  }

  private getRouteLanguageCode(): string {
    return this.getCurrentUrlSegments()[0];
  }

  private extractCurrentLanguageCode(): string {
    const routeLanguageCode = this.getRouteLanguageCode();
    const storedLanguageCode = localStorage.getItem(this.LANGUAGE_KEY);
    const browserLanguageCode = navigator.language.split('-')[0].toLowerCase();

    if (this.isSuitableLanguageCode(routeLanguageCode))
      return routeLanguageCode;
    if (this.isSuitableLanguageCode(storedLanguageCode))
      return storedLanguageCode;
    if (this.isSuitableLanguageCode(browserLanguageCode))
      return browserLanguageCode;
    return this.fallbackLanguageCode;
  }

  setLanguage(languageCode: string) {
    const language = this.availableLanguages[languageCode];
    if (!language) return;

    this.selectedLanguage.set(language);
    this.translate.use(languageCode);
    localStorage.setItem(this.LANGUAGE_KEY, languageCode);
  }

  navigateToCurrentLanguage() {
    const languageCode = this.selectedLanguage().code;
    const segments = this.getCurrentUrlSegments();
    const newSegments = this.withLanguageSegment(languageCode, segments);

    if (newSegments[0] === this.getRouteLanguageCode()) return;

    this.router.navigate(['/', ...newSegments], {
      replaceUrl: true,
      queryParamsHandling: 'preserve',
      preserveFragment: true,
    });
  }

  private isSuitableLanguageCode(
    languageCode: string | null | undefined,
  ): languageCode is string {
    return (
      typeof languageCode === 'string' &&
      languageCode in this.availableLanguages
    );
  }
}
