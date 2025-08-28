import { Component, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { LanguageDropdownComponent } from '../language-dropdown/language-dropdown';
import { SectionObserverService } from '../../services/section-observer';

@Component({
  selector: 'app-navbar',
  imports: [LanguageDropdownComponent, TranslatePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent {
  classes = signal('bg-white text-black');
  private sectionObserver = inject(SectionObserverService);

  constructor() {
    this.sectionObserver.currentSection$.subscribe((section) => {
      if (section == 'hero') this.classes.set('bg-transparent text-white');
      else this.classes.set('bg-white text-black shadow-md');
    });
  }
}
