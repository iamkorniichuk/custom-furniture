import { Component, inject, signal } from '@angular/core';
import { ClickOutsideDirective } from '../../directives/click-outside';
import { LanguageService, Language } from '../../services/language';

@Component({
  selector: 'app-language-dropdown',
  imports: [ClickOutsideDirective],
  templateUrl: './language-dropdown.html',
  styleUrl: './language-dropdown.css',
})
export class LanguageDropdownComponent {
  private languageService = inject(LanguageService);
  readonly availableLanguages = Object.values(
    this.languageService.availableLanguages,
  );
  selectedLanguage = this.languageService.selectedLanguage;

  isDropdownOpen = signal(false);

  toggleDropdown() {
    this.isDropdownOpen.update((isOpen) => !isOpen);
  }

  close() {
    this.isDropdownOpen.set(false);
  }

  selectLanguage(language: Language) {
    this.languageService.setLanguage(language.code);
    this.languageService.navigateToCurrentLanguage();
    this.close();
  }
}
