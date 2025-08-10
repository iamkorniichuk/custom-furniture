import { Component } from '@angular/core';
import { LanguageDropdown } from '../language-dropdown/language-dropdown';

@Component({
  selector: 'app-hero',
  imports: [LanguageDropdown],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero {}
