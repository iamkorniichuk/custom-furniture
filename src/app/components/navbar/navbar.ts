import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

import { LanguageDropdownComponent } from '../language-dropdown/language-dropdown';
import { LanguageService } from '../../services/language';
import { NavbarStateService } from '../../services/navbar-state';

@Component({
  selector: 'app-navbar',
  imports: [LanguageDropdownComponent, TranslatePipe, RouterLink, NgClass],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent {
  private languageService = inject(LanguageService);
  private navbarState = inject(NavbarStateService);

  allowOverlap = this.navbarState.allowOverlap;
  selectedLanguage = this.languageService.selectedLanguage;
}
