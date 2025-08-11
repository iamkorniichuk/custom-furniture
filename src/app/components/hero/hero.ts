import { Component } from '@angular/core';
import { LanguageDropdown } from '../language-dropdown/language-dropdown';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-hero',
  imports: [LanguageDropdown, TranslatePipe],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero {}
