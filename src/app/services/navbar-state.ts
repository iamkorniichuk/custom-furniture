import { inject, Injectable, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarStateService {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  allowOverlap = signal(false);

  constructor() {
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
