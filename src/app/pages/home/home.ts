import { AfterViewInit, Component, inject } from '@angular/core';

import { HeroSectionComponent } from './sections/hero/hero';
import { SectionNavigationService } from '../../services/section-navigation';

@Component({
  selector: 'app-home',
  imports: [HeroSectionComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements AfterViewInit {
  private sectionNavigation = inject(SectionNavigationService);

  ngAfterViewInit() {
    this.sectionNavigation.start();
  }
}
