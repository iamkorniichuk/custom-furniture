import { Component, inject, AfterViewInit } from '@angular/core';

import { SectionNavigationService } from '../../services/section-navigation';
import { CountriesComponents } from './sections/countries/countries';

@Component({
  selector: 'app-contacts',
  imports: [CountriesComponents],
  templateUrl: './contacts.html',
  styleUrl: './contacts.css',
})
export class ContactsComponent implements AfterViewInit {
  private sectionNavigation = inject(SectionNavigationService);

  ngAfterViewInit() {
    this.sectionNavigation.start();
  }
}
