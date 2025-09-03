import { inject, Injectable, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { SectionObserverService } from './section-observer';

@Injectable({
  providedIn: 'root',
})
export class NavbarStateService {
  private sectionObserver = inject(SectionObserverService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  allowOverlap = signal(false);
  isTransparent = signal(true);

  constructor() {
    this.sectionObserver.currentSection$.subscribe((section) => {
      this.isTransparent.set(section === 'hero');
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        let child = this.route.firstChild;
        while (child?.firstChild) {
          child = child.firstChild;
        }

        const path = child?.routeConfig?.path;
        this.allowOverlap.set(path === '');
      });
  }
}
