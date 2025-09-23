import { Component, input, signal } from '@angular/core';

import { ArrowIconComponent } from '../arrow-icon/arrow-icon';
import { ContrastGradientComponent } from '../contrast-gradient/contrast-gradient';
import { Image } from '../../shared/images';

@Component({
  selector: 'app-image-carousel',
  imports: [ArrowIconComponent, ContrastGradientComponent],
  templateUrl: './image-carousel.html',
})
export class ImageCarouseComponent {
  images = input.required<Image[]>();
  alt = input<string>('');

  currentIndex = signal<number>(0);
  isLoaded = signal<boolean>(false);

  goToNext() {
    this.currentIndex.update((value) => (value + 1) % this.images().length);
  }

  goToPrevious() {
    this.currentIndex.update((value) => (value - 1) % this.images().length);
  }
}
