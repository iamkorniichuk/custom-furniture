import {
  Component,
  ElementRef,
  HostListener,
  Input,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

import { ArrowIconComponent } from '../arrow-icon/arrow-icon';

@Component({
  selector: 'app-dropdown',
  imports: [ArrowIconComponent, NgTemplateOutlet],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css',
})
export class DropdownComponent {
  @Input() trigger!: TemplateRef<unknown>;
  @Input() menu!: TemplateRef<unknown>;
  @ViewChild('mobileTrigger') mobileTrigger!: ElementRef;

  isOpen = signal(false);

  toggle() {
    this.isOpen.update((value) => !value);
  }

  @HostListener('document:click', ['$event.target'])
  close(target: EventTarget | null) {
    if (this.mobileTrigger.nativeElement.contains(target)) return;
    this.isOpen.set(false);
  }
}
