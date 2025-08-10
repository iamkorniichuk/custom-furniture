import { Component, signal } from '@angular/core';
import { Hero } from './components/hero/hero';

@Component({
  selector: 'app-root',
  imports: [Hero],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('custom-furniture');
}
