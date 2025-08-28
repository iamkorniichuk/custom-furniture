import { Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { LanguageDropdown } from '../language-dropdown/language-dropdown';
import { SectionObserver } from '../../services/section-observer';

@Component({
  selector: 'app-navbar',
  imports: [LanguageDropdown, TranslatePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  classes = signal('bg-white text-black');

  constructor(private sectionObserver: SectionObserver) {
    this.sectionObserver.currentSection$.subscribe(section => {
      if (section == 'hero') this.classes.set('bg-transparent text-white');
      else this.classes.set('bg-white text-black shadow-md');
    });
  }
}