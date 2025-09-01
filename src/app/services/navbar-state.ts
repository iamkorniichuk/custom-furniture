import { inject, Injectable, signal } from '@angular/core';
import { SectionObserverService } from './section-observer';

@Injectable({
  providedIn: 'root',
})
export class NavbarStateService {
  private sectionObserver = inject(SectionObserverService);
  allowOverlap = signal(false);

  constructor() {
    this.sectionObserver.currentSection$.subscribe((section) => {
      this.allowOverlap.set(section === 'hero');
    });
  }
}
