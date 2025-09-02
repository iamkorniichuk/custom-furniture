import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-arrow-icon',
  templateUrl: './arrow-icon.html',
})
export class ArrowIconComponent {
  @Input() class = 'w-3 h-3';
}
