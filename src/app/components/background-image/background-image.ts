import { Component, input } from '@angular/core';

import { ImagePaths } from '../../shared/images';

@Component({
  selector: 'app-background-image',
  imports: [],
  templateUrl: './background-image.html',
})
export class BackgroundImageComponent {
  sourcePaths = input.required<ImagePaths | null>();
  alt = input<string>('');
}
