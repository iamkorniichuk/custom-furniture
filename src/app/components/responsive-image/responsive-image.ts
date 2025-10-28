import { Component, input, signal } from '@angular/core';
import { FixedImage, ImageFormat, ResponsiveImage } from '../../shared/images';

export type ImgLoading = 'lazy' | 'eager';
export type ImgDecoding = 'auto' | 'sync' | 'async';

@Component({
  selector: 'app-responsive-image',
  imports: [],
  templateUrl: './responsive-image.html',
})
export class ResponsiveImageComponent {
  image = input.required<ResponsiveImage>();
  alt = input.required<string>();
  imgClass = input<string>();
  sizes = input<string>();
  loading = input<ImgLoading>('eager');
  decoding = input<ImgDecoding>('auto');

  isLoaded = signal<boolean>(false);

  protected readonly priorityFormats: ImageFormat[] = [
    'image/avif',
    'image/webp',
  ];

  protected buildSrcset(images: FixedImage[]): string {
    const results: string[] = [];
    for (const img of images) {
      results.push(`${img.src} ${img.width}w`);
    }
    return results.join(', ');
  }

  get fallbackImages(): FixedImage[] {
    return this.image().paths['image/webp'];
  }

  onLoad(): void {
    this.isLoaded.set(true);
  }
}
