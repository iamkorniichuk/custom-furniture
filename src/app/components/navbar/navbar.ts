import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  NgZone,
  inject,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { LanguageDropdownComponent } from '../language-dropdown/language-dropdown';
import { LanguageService } from '../../services/language';
import { NavbarStateService } from '../../services/navbar-state';
import { PortfolioDropdownComponent } from '../portfolio-dropdown/portfolio-dropdown';

@Component({
  selector: 'app-navbar',
  imports: [
    LanguageDropdownComponent,
    TranslatePipe,
    RouterLink,
    RouterLinkActive,
    NgClass,
    PortfolioDropdownComponent,
  ],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  private languageService = inject(LanguageService);
  private navbarState = inject(NavbarStateService);
  private element = inject(ElementRef<HTMLElement>);
  private ngZone = inject(NgZone);

  private resizeObserver: ResizeObserver | null = null;
  private onResizeBound = this.onResize.bind(this);

  allowOverlap = this.navbarState.allowOverlap;
  selectedLanguage = this.languageService.selectedLanguage;

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.setViewportHeight();
      this.setNavbarHeight();

      window.addEventListener('resize', this.onResizeBound);

      this.resizeObserver = new ResizeObserver(() => this.setNavbarHeight());
      this.resizeObserver.observe(this.element.nativeElement);
    });
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onResizeBound);
    if (this.resizeObserver) this.resizeObserver.disconnect();
  }

  private onResize() {
    this.setViewportHeight();
    this.setNavbarHeight();
  }

  private setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  private setNavbarHeight() {
    const navElement = this.element.nativeElement;
    const height = navElement.getBoundingClientRect().height;
    document.documentElement.style.setProperty(
      '--navbar-h',
      `${Math.round(height)}px`,
    );

    const isFixed =
      getComputedStyle(navElement).position === 'fixed' ||
      navElement.classList.contains('fixed');
    if (isFixed) {
      document.documentElement.classList.add('nav-overlay');
    } else {
      document.documentElement.classList.remove('nav-overlay');
    }
  }
}
