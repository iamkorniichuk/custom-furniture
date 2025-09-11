import { Component, ElementRef, inject, AfterViewInit, OnDestroy } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { LanguageDropdownComponent } from '../language-dropdown/language-dropdown';
import { LanguageService } from '../../services/language';
import { PortfolioDropdownComponent } from '../portfolio-dropdown/portfolio-dropdown';

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
export class NavbarComponent implements AfterViewInit, OnDestroy {
  private language = inject(LanguageService);
  private element = inject(ElementRef<HTMLElement>);

  selectedLanguage = this.language.selectedLanguage;
  private onResizeBound = this.updateNavbarHeight.bind(this);

  ngAfterViewInit() {
    this.updateNavbarHeight();
    window.addEventListener('resize', this.onResizeBound);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onResizeBound);
  }

  updateNavbarHeight() {
    const navElement = this.element.nativeElement;
    const height = navElement.getBoundingClientRect().height;
    document.documentElement.style.setProperty(
      '--navbar-h',
      `${Math.round(height)}px`,
    );
  }
}
