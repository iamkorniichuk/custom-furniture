import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { ImagePaths } from '../../../../shared/images';
import { backgrounds } from '../../../../shared/backgrounds';
import { contacts } from '../../../../shared/contacts';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hero-section',
  imports: [TranslatePipe, RouterModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class HeroSectionComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);

  info = contacts;
  private intervalId?: number;

  backgroundImage1 = signal<ImagePaths | null>(null);
  backgroundImage2 = signal<ImagePaths | null>(null);
  showBackgroundImage1 = signal(true);

  ngOnInit() {
    this.backgroundImage1.set(this.randomBackgroundImage());
    this.backgroundImage2.set(this.randomBackgroundImage());

    if (isPlatformBrowser(this.platformId)) {
      this.intervalId = window.setInterval(() => {
        this.swapBackgroundImages();
      }, 8_000);
    }
  }

  private swapBackgroundImages() {
    const next = this.randomBackgroundImage();

    if (this.showBackgroundImage1()) {
      this.backgroundImage2.set(next);
    } else {
      this.backgroundImage1.set(next);
    }

    this.showBackgroundImage1.update((value) => !value);
  }

  private randomBackgroundImage(): ImagePaths {
    const idx = Math.floor(Math.random() * backgrounds.length);
    return backgrounds[idx];
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.intervalId) clearInterval(this.intervalId);
    }
  }
}
