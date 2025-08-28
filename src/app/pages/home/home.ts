import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd }from '@angular/router';
import { filter } from 'rxjs';

import { Hero } from "../../components/hero/hero";

@Component({
  selector: 'app-home',
  imports: [Hero],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;

  constructor(private router: Router) {
      this.router.events
        .pipe(filter(e => e instanceof NavigationEnd))
        .subscribe(() => {
          const fragment = this.router.parseUrl(this.router.url).fragment;
          if (fragment) {
            document.getElementById(fragment)
              ?.scrollIntoView({ behavior: 'smooth' });
          }
        });
    }

  ngAfterViewInit() {
    const sections = document.querySelectorAll<HTMLElement>('section[id]');

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const path = this.router.url.split('#')[0];
            history.replaceState(null, '', path + '#' + entry.target.id);
          }
        });
      },
      {
        threshold: 0.6,
      }
    );

    sections.forEach((section) => this.observer!.observe(section));
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
