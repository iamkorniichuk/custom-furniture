import { Component, inject, signal } from '@angular/core';
import { ClickOutside } from '../../directives/click-outside';
import { TranslateService } from '@ngx-translate/core';
import { AVAILABLE_LANGUAGES, FALLBACK_LANGUAGE, Language } from '../../language.config';

@Component({
  selector: 'app-language-dropdown',
  imports: [ClickOutside],
  templateUrl: './language-dropdown.html',
  styleUrl: './language-dropdown.css'
})
export class LanguageDropdown {
  private translate = inject(TranslateService);
  isDropdownOpen = signal(false);

  readonly availableLanguages = AVAILABLE_LANGUAGES;
  selectedLanguage = FALLBACK_LANGUAGE

  constructor() {
    const languageCodes = AVAILABLE_LANGUAGES.map(l => l.code);
    this.translate.addLangs(languageCodes);
    this.translate.setFallbackLang(FALLBACK_LANGUAGE.code);

    const browserLanguageCode = navigator.language.split('-')[0].toLocaleLowerCase();
    const browserLanguage = AVAILABLE_LANGUAGES.find(l => l.code === browserLanguageCode) || FALLBACK_LANGUAGE;
    this.applyLanguage(browserLanguage);
  }
  
  toggleDropdown() {
    this.isDropdownOpen.update((value) => !value);
  }
  
  private applyLanguage(language: Language) {
    this.selectedLanguage = language;
    this.translate.use(language.code);
  }

  selectLanguage(language: Language) {
    this.applyLanguage(language);
    this.isDropdownOpen.set(false);
  }

  close() {
    this.isDropdownOpen.set(false);
  }
}
