import { Component, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

import { LanguageDropdownComponent } from '../language-dropdown/language-dropdown';
import { SectionObserverService } from '../../services/section-observer';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-navbar',
  imports: [LanguageDropdownComponent, TranslatePipe, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent {
  private sectionObserver = inject(SectionObserverService);
  private languageService = inject(LanguageService);

  classes = signal('bg-white text-black shadow-md');
  selectedLanguage = this.languageService.selectedLanguage;

  constructor() {
    this.sectionObserver.currentSection$.subscribe((section) => {
      if (section === 'hero') this.classes.set('bg-transparent text-white');
      else this.classes.set('bg-white text-black shadow-md');
    });
  }
}
