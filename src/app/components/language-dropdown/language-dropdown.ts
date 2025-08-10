import { Component, signal } from '@angular/core';
import { ClickOutside } from '../../directives/click-outside';

@Component({
  selector: 'app-language-dropdown',
  imports: [ClickOutside],
  templateUrl: './language-dropdown.html',
  styleUrl: './language-dropdown.css'
})
export class LanguageDropdown {
  isOpen = signal(false);

  languages = [
    { code: 'EN', src: '/images/flags/united-kingdom.png', label: 'English' },
    { code: 'PL', src: '/images/flags/poland.png', label: 'Polski' },
    { code: 'DE', src: '/images/flags/germany.png', label: 'Deutsche' },
    { code: 'CZ', src: '/images/flags/czech-republic.png', label: 'Češky' },
    { code: 'UA', src: '/images/flags/ukraine.png', label: 'Українська' },
  ];

  selected = this.languages[0];

  toggleDropdown() {
    this.isOpen.update((value) => !value);
  }

  selectLanguage(lang: any) {
    this.selected = lang;
    this.isOpen.set(false);
  }

  close() {
    this.isOpen.set(false);
  }
}
