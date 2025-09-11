import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { PlaceMapComponent } from '../../../../components/place-map/place-map';
import { TranslatedPipe } from '../../../../pipes/translated-pipe';
import { contacts } from '../../../../shared/contacts';
import { ScrollSectionComponent } from '../../../../components/scroll-section/scroll-section';

@Component({
  selector: 'app-contacts-section',
  imports: [
    TranslatePipe,
    TranslatedPipe,
    PlaceMapComponent,
    ScrollSectionComponent,
  ],
  templateUrl: './contacts.html',
  styleUrl: './contacts.css',
})
export class ContactsSectionComponent {
  info = contacts;
}
