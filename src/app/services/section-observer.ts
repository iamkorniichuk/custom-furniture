import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionObserver implements OnDestroy {
  private observer?: IntersectionObserver;
  private currentSectionSubject = new BehaviorSubject<string|null>(null);
  readonly currentSection$ = this.currentSectionSubject.asObservable();

  start() {
    this.observer?.disconnect();

    const sections = document.querySelectorAll<HTMLElement>('section[id]');
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            this.currentSectionSubject.next(id);
          }
        })
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => this.observer!.observe(section));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
