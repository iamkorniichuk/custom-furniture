import { Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, first } from 'rxjs';

export type Language = {
  code: string;
  src: string;
  label: string;
};

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private LANGUAGE_KEY = 'language';
  readonly availableLanguages: { [code: string]: Language } = {
    'en': { code: 'en', src: '/images/flags/united-kingdom.png', label: 'English' },
    'pl': { code: 'pl', src: '/images/flags/poland.png', label: 'Polski' },
    'de': { code: 'de', src: '/images/flags/germany.png', label: 'Deutsch' },
    'cz': { code: 'cz', src: '/images/flags/czech-republic.png', label: 'Čeština' },
    'ua': { code: 'ua', src: '/images/flags/ukraine.png', label: 'Українська' },
  };
  readonly fallbackLanguageCode = 'en';
  readonly selectedLanguage = signal(this.availableLanguages[this.fallbackLanguageCode]);

  constructor(
    public translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.translate.addLangs(Object.keys(this.availableLanguages));
    this.translate.setFallbackLang(this.fallbackLanguageCode);

    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        first(),
      )
      .subscribe(() => {
        const currentLanguageCode = this.extractCurrentLanguageCode();
        this.setLanguage(currentLanguageCode);
        this.navigateToCurrentLanguage();

        this.router.events
          .pipe(filter(e => e instanceof NavigationEnd))
          .subscribe(() => {
            const routeLanguageCode = this.getRouteLanguageCode();
            if (this.isSuitableLanguageCode(routeLanguageCode) && routeLanguageCode !== this.translate.getCurrentLang()) {
              this.setLanguage(routeLanguageCode);
            }
          });
      })
    }
  
  private getRouteLanguageCode(): string
  {
    const path = this.router.url.split(/[?#]/)[0]
    const segments = path.split('/').filter(Boolean);
    return segments[0];
  }

  private extractCurrentLanguageCode(): string
  {
    const routeLanguageCode = this.getRouteLanguageCode();
    const storedLanguageCode = localStorage.getItem(this.LANGUAGE_KEY);
    const browserLanguageCode = navigator.language.split('-')[0].toLowerCase();

    if (this.isSuitableLanguageCode(routeLanguageCode)) return routeLanguageCode;
    if (this.isSuitableLanguageCode(storedLanguageCode)) return storedLanguageCode;
    if (this.isSuitableLanguageCode(browserLanguageCode)) return browserLanguageCode;
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

    const path = this.router.url.split(/[?#]/)[0]
    const segments = path.split('/').filter(Boolean);
    const routeLanguageCode = segments[0];

    if (routeLanguageCode === languageCode) return;

    if (this.isSuitableLanguageCode(routeLanguageCode)) {
      segments.shift();
    }

    const newSegments = ['/', languageCode, ...segments];
    this.router.navigate(newSegments, {
      replaceUrl: true,
      queryParamsHandling: 'preserve',
      preserveFragment: true,
    });
  }

  private isSuitableLanguageCode(languageCode: string | null | undefined): languageCode is string {
    return typeof languageCode === 'string' && languageCode in this.availableLanguages;
  }
}
