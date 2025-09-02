import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { roomOptions } from '../../shared/portfolio';
import { LanguageService } from '../../services/language';
import { TranslatedPipe } from '../../pipes/translated-pipe';
import { ArrowIconComponent } from '../arrow-icon/arrow-icon';

@Component({
  selector: 'app-portfolio-dropdown',
  imports: [TranslatedPipe, TranslatePipe, RouterLink, ArrowIconComponent],
  templateUrl: './portfolio-dropdown.html',
  styleUrl: './portfolio-dropdown.css',
})
export class PortfolioDropdownComponent {
  private languageService = inject(LanguageService);

  selectedLanguage = this.languageService.selectedLanguage;
  roomOptions = roomOptions;
}
