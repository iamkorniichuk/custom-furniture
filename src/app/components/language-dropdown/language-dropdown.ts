import { Component, inject } from '@angular/core';
import { LanguageService, Language } from '../../services/language';
import { ArrowIconComponent } from '../arrow-icon/arrow-icon';

@Component({
  selector: 'app-language-dropdown',
  imports: [ArrowIconComponent],
  templateUrl: './language-dropdown.html',
  styleUrl: './language-dropdown.css',
})
export class LanguageDropdownComponent {
  private languageService = inject(LanguageService);
  readonly availableLanguages = Object.values(
    this.languageService.availableLanguages,
  );
  selectedLanguage = this.languageService.selectedLanguage;

  selectLanguage(language: Language) {
    this.languageService.setLanguage(language.code);
    this.languageService.navigateToCurrentLanguage();
  }
}
