import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { ArrowIconComponent } from '../../../../components/arrow-icon/arrow-icon';
import { ImagePaths } from '../../../../shared/images';
import { backgrounds } from '../../../../shared/backgrounds';

@Component({
  selector: 'app-hero',
  imports: [TranslatePipe, RouterModule, ArrowIconComponent],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class HeroComponent implements OnInit, OnDestroy {
  private intervalId?: number;

  backgroundImage1 = signal<ImagePaths | null>(null);
  backgroundImage2 = signal<ImagePaths | null>(null);
  showBackgroundImage1 = signal(true);

  ngOnInit() {
    this.backgroundImage1.set(this.randomBackgroundImage());
    this.backgroundImage2.set(this.randomBackgroundImage());

    this.intervalId = window.setInterval(() => {
      this.swapBackgroundImages();
    }, 8_000);
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
    if (this.intervalId) clearInterval(this.intervalId);
  }
}
