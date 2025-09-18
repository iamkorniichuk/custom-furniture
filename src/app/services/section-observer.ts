import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, OnDestroy, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SectionObserverService implements OnDestroy {
  private platformId = inject(PLATFORM_ID);

  private observer?: IntersectionObserver;
  private currentSectionSubject = new BehaviorSubject<string | null>(null);
  readonly currentSection$ = this.currentSectionSubject.asObservable();

  start() {
    this.observer?.disconnect();

    if (!isPlatformBrowser(this.platformId)) return;
    const sections = document.querySelectorAll<HTMLElement>('section[id]');
    if (sections.length === 0) {
      this.currentSectionSubject.next(null);
      return;
    }
    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);

        if (visible) {
          this.currentSectionSubject.next(visible.target.id);
        } else {
          this.currentSectionSubject.next(null);
        }
      },
      { threshold: 0.6 },
    );

    sections.forEach((section) => this.observer!.observe(section));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
