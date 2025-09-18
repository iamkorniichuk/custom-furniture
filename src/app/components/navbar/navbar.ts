import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { LanguageDropdownComponent } from '../language-dropdown/language-dropdown';
import { LanguageService } from '../../services/language';
import { PortfolioDropdownComponent } from '../portfolio-dropdown/portfolio-dropdown';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [
    LanguageDropdownComponent,
    TranslatePipe,
    RouterLink,
    RouterLinkActive,
    PortfolioDropdownComponent,
  ],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);

  private language = inject(LanguageService);
  private element = inject(ElementRef<HTMLElement>);

  selectedLanguage = this.language.selectedLanguage;
  private onResizeBound = this.updateNavbarHeight.bind(this);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.updateNavbarHeight();
      window.addEventListener('resize', this.onResizeBound);
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId))
      window.removeEventListener('resize', this.onResizeBound);
  }

  updateNavbarHeight() {
    if (isPlatformBrowser(this.platformId)) {
      const navElement = this.element.nativeElement;
      const height = navElement.getBoundingClientRect().height;
      document.documentElement.style.setProperty('--navbar-h', `${height}px`);
    }
  }
}
