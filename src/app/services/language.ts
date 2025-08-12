import { Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

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
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        const routeLanguageCode = this.route.root.firstChild?.snapshot.paramMap.get(this.LANGUAGE_KEY);
        if (this.isSuitableLanguageCode(routeLanguageCode) && routeLanguageCode !== this.translate.getCurrentLang()) {
          this.setLanguage(routeLanguageCode);
        }
      })

    const routeLanguage = this.route.snapshot.paramMap.get(this.LANGUAGE_KEY);
    const storedLanguage = localStorage.getItem(this.LANGUAGE_KEY);
    const browserLanguage = navigator.language.split('-')[0].toLowerCase();
  
    let languageCode = this.fallbackLanguageCode;
    if (this.isSuitableLanguageCode(routeLanguage)) {
      languageCode = routeLanguage;
    } else if (this.isSuitableLanguageCode(storedLanguage)) {
      languageCode = storedLanguage;
    } else if (this.isSuitableLanguageCode(browserLanguage)) {
      languageCode = browserLanguage;
    }

    this.setLanguage(languageCode);
    this.navigateToLanguage();
  }

  setLanguage(languageCode: string) {
    const language = this.availableLanguages[languageCode];
    if (!language) return;

    this.selectedLanguage.set(language);
    this.translate.use(languageCode);
    localStorage.setItem(this.LANGUAGE_KEY, languageCode);
  }

  navigateToLanguage() {
    const languageCode = this.selectedLanguage().code;
    const url = this.router.url;

    const segments = url.split('/').filter(Boolean);
    const routeLanguageCode = this.route.snapshot.paramMap.get(this.LANGUAGE_KEY);

    if (routeLanguageCode === languageCode) return;

    if (this.isSuitableLanguageCode(routeLanguageCode)) {
      segments.shift();
    }

    const newSegments = [languageCode, ...segments];
    this.router.navigate(['/', ...newSegments], {replaceUrl: true})
  }

  private isSuitableLanguageCode(languageCode: string | null | undefined): languageCode is string {
    return typeof languageCode === 'string' && languageCode in this.availableLanguages;
  }
}
