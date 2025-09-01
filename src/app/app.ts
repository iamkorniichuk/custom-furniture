import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { NavbarStateService } from './services/navbar-state';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('custom-furniture');
  private navbarState = inject(NavbarStateService);

  allowNavbarOverlap = this.navbarState.allowOverlap;
}
