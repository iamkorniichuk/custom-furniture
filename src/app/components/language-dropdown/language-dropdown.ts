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
    { code: 'EN', src: '/images/united-kingdom.png', label: 'English' },
    { code: 'PL', src: '/images/poland.png', label: 'Polski' },
    { code: 'DE', src: '/images/germany.png', label: 'Deutsche' },
    { code: 'CZ', src: '/images/czech-republic.png', label: 'Češky' },
    { code: 'UA', src: '/images/ukraine.png', label: 'Українська' },
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
