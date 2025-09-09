import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { PlaceMapComponent } from '../../../../components/place-map/place-map';
import { TranslatedPipe } from '../../../../pipes/translated-pipe';
import { contacts } from '../../../../shared/contacts';
import { RouterLink } from '@angular/router';
import { ArrowIconComponent } from '../../../../components/arrow-icon/arrow-icon';

@Component({
  selector: 'app-contacts-section',
  imports: [
    TranslatePipe,
    TranslatedPipe,
    PlaceMapComponent,
    RouterLink,
    ArrowIconComponent,
  ],
  templateUrl: './contacts.html',
  styleUrl: './contacts.css',
})
export class ContactsSectionComponent {
  info = contacts;
}
