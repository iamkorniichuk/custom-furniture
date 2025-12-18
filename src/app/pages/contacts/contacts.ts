import { Component, inject, AfterViewInit } from '@angular/core';

import { SectionNavigationService } from '../../services/section-navigation';
import { ContactsSectionComponent } from './sections/contacts/contacts';

@Component({
  selector: 'app-contacts',
  imports: [ContactsSectionComponent],
  templateUrl: './contacts.html',
  styleUrl: './contacts.css',
})
export class ContactsComponent implements AfterViewInit {
  private sectionNavigation = inject(SectionNavigationService);

  ngAfterViewInit() {
    this.sectionNavigation.start();
  }
}
