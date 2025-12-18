import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { TranslatedPipe } from '../../../../pipes/translated-pipe';
import { contacts } from '../../../../shared/contacts';

@Component({
  selector: 'app-contacts-section',
  imports: [TranslatePipe, TranslatedPipe],
  templateUrl: './contacts.html',
  styleUrl: './contacts.css',
})
export class ContactsSectionComponent {
  info = contacts;
}
