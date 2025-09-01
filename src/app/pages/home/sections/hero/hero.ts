import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import backgroundData from '../../../../../assets/backgrounds.json';

@Component({
  selector: 'app-hero',
  imports: [TranslatePipe, RouterModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class HeroComponent implements OnInit, OnDestroy {
  private intervalId?: number;

  backgroundImage1 = signal<string | null>(null);
  backgroundImage2 = signal<string | null>(null);
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

  private randomBackgroundImage(): string {
    const idx = Math.floor(Math.random() * backgroundData.length);
    return backgroundData[idx];
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}
