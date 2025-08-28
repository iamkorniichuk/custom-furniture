import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [TranslatePipe, RouterModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class HeroComponent {}
