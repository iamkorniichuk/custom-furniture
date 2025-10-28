import { Component, input, signal } from '@angular/core';

import { ArrowIconComponent } from '../arrow-icon/arrow-icon';
import { ContrastGradientComponent } from '../contrast-gradient/contrast-gradient';
import { ResponsiveImage } from '../../shared/images';
import { ResponsiveImageComponent } from '../responsive-image/responsive-image';

@Component({
  selector: 'app-image-carousel',
  imports: [
    ArrowIconComponent,
    ContrastGradientComponent,
    ResponsiveImageComponent,
  ],
  templateUrl: './image-carousel.html',
})
export class ImageCarouseComponent {
  images = input.required<ResponsiveImage[]>();
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
