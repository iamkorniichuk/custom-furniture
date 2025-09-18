import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

import { SectionObserverService } from './section-observer';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SectionNavigationService {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  private sectionObserver = inject(SectionObserverService);

  constructor() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        const fragment = this.router.parseUrl(this.router.url).fragment;
        if (fragment) {
          if (isPlatformBrowser(this.platformId)) {
            document
              .getElementById(fragment)
              ?.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });

    this.sectionObserver.currentSection$.subscribe((section) => {
      if (section === null) return;
      const path = this.router.url.split('#')[0];
      if (isPlatformBrowser(this.platformId))
        history.replaceState(null, '', path + '#' + section);
    });
  }

  start() {
    this.sectionObserver.start();
  }
}
