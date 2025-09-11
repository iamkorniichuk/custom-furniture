import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { ArrowIconComponent } from '../arrow-icon/arrow-icon';

@Component({
  selector: 'app-scroll-section',
  imports: [RouterLink, ArrowIconComponent, TranslatePipe],
  templateUrl: './scroll-section.html',
})
export class ScrollSectionComponent {
  @Input() class = '';
  @Input() fragment = '';
}
