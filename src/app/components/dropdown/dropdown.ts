import {
  Component,
  ElementRef,
  HostListener,
  inject,
  Input,
  PLATFORM_ID,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';

import { ArrowIconComponent } from '../arrow-icon/arrow-icon';

@Component({
  selector: 'app-dropdown',
  imports: [ArrowIconComponent, NgTemplateOutlet],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css',
})
export class DropdownComponent {
  private platformId = inject(PLATFORM_ID);

  @Input() trigger!: TemplateRef<unknown>;
  @Input() menu!: TemplateRef<unknown>;
  @ViewChild('mobileTrigger') mobileTrigger!: ElementRef;

  isOpen = signal(false);

  toggle() {
    this.isOpen.update((value) => !value);
  }

  @HostListener('document:click', ['$event.target'])
  close(target: EventTarget | null) {
    if (!isPlatformBrowser(this.platformId)) return;

    if (this.mobileTrigger.nativeElement.contains(target)) return;
    this.isOpen.set(false);
  }
}
