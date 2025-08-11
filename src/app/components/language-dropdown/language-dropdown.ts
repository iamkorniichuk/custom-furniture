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
  private STORAGE_KEY = 'language';

  constructor() {
    const languageCodes = AVAILABLE_LANGUAGES.map(l => l.code);
    this.translate.addLangs(languageCodes);
    this.translate.setFallbackLang(FALLBACK_LANGUAGE.code);

    const storedLanguageCode = localStorage.getItem(this.STORAGE_KEY);
    const browserLanguageCode = navigator.language.split('-')[0].toLocaleLowerCase();

    const translateLanguages = this.translate.getLangs(); 
    let currentLanguageCode = "";
    if (storedLanguageCode && translateLanguages.find(code => code === storedLanguageCode)) {
      currentLanguageCode = storedLanguageCode;
    } else if (browserLanguageCode  && translateLanguages.find(code => code === browserLanguageCode)) {
      currentLanguageCode = browserLanguageCode;
    }

    const currentLanguage = AVAILABLE_LANGUAGES.find(l => l.code === currentLanguageCode) || FALLBACK_LANGUAGE;
    this.applyLanguage(currentLanguage);
  }
  
  toggleDropdown() {
    this.isDropdownOpen.update((value) => !value);
  }
  
  private applyLanguage(language: Language) {
    this.selectedLanguage = language;
    this.translate.use(language.code);

    localStorage.setItem(this.STORAGE_KEY, language.code);
  }

  selectLanguage(language: Language) {
    this.applyLanguage(language);
    this.isDropdownOpen.set(false);
  }

  close() {
    this.isDropdownOpen.set(false);
  }
}
