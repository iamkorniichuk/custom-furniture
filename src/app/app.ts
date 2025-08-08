import { Component, signal } from '@angular/core';
import { LanguageDropdown } from './components/language-dropdown/language-dropdown';

@Component({
  selector: 'app-root',
  imports: [LanguageDropdown],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('custom-furniture');
}
