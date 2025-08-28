import { AfterViewInit, Component } from '@angular/core';
import { Router, NavigationEnd }from '@angular/router';
import { filter } from 'rxjs';

import { HeroComponent } from "./sections/hero/hero";
import { SectionObserverService } from '../../services/section-observer';

@Component({
  selector: 'app-home',
  imports: [HeroComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements AfterViewInit {
  constructor(private router: Router, private sectionObserver: SectionObserverService) {
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
    this.sectionObserver.start();
    this.sectionObserver.currentSection$.subscribe(section => {
      const path = this.router.url.split('#')[0];
      history.replaceState(null, '', path + '#' + section);
    });
  }
}
