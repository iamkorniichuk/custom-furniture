import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ResponsiveImage } from '../../../../shared/images';
import { backgrounds } from '../../../../shared/backgrounds';
import { contacts } from '../../../../shared/contacts';
import { ResponsiveImageComponent } from '../../../../components/responsive-image/responsive-image';

@Component({
  selector: 'app-hero-section',
  imports: [TranslatePipe, RouterModule, ResponsiveImageComponent],
  templateUrl: './hero.html',
})
export class HeroSectionComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);

  info = contacts;
  private intervalId?: number;

  image1 = signal<ResponsiveImage>(backgrounds[0]);
  image2 = signal<ResponsiveImage>(backgrounds[1]);
  showImage1 = signal(true);

  ngOnInit() {
    this.image1.set(this.randomImage());
    this.image2.set(this.randomImage());

    if (isPlatformBrowser(this.platformId)) {
      this.intervalId = window.setInterval(() => {
        this.swapImages();
      }, 8_000);
    }
  }

  private swapImages() {
    const next = this.randomImage();

    if (this.showImage1()) {
      this.image2.set(next);
    } else {
      this.image1.set(next);
    }

    this.showImage1.update((value) => !value);
  }

  private randomImage(): ResponsiveImage {
    const idx = Math.floor(Math.random() * backgrounds.length);
    return backgrounds[idx];
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.intervalId) clearInterval(this.intervalId);
    }
  }
}
