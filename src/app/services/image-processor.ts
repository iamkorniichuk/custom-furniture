import { Injectable } from '@angular/core';
import { manipulate, loadImage } from 'imagess';

import { ImageFormat, ImageSize } from '../shared/images';

export interface FixedBlob extends ImageSize {
  blob: Blob;
  name: string;
}

export interface ResponsiveBlob extends ImageSize {
  images: Record<ImageFormat, FixedBlob[]>;
}

@Injectable({
  providedIn: 'root',
})
export class ImageProcessorService {
  private readonly pixelTargets = [0.25e6, 1e6, 4e6];

  async process(file: File) {
    const avifResults: FixedBlob[] = [];
    const webpResults: FixedBlob[] = [];

    const image = await loadImage(file);

    for (const target of this.pixelTargets) {
      const aspect = image.width / image.height;
      const targetHeight = Math.round(Math.sqrt(target / aspect));
      const targetWidth = Math.round(targetHeight * aspect);

      const filename = `${file.name.replace(/\.[^.]+$/, '')}_${targetWidth}`;

      const [avifBlob, webpBlob] = await Promise.all([
        manipulate(file, {
          format: 'image/avif',
          width: targetWidth,
          height: targetHeight,
        }),
        manipulate(file, {
          format: 'image/webp',
          width: targetWidth,
          height: targetHeight,
        }),
      ]);
      avifResults.push({
        blob: avifBlob,
        name: `${filename}.avif`,
        width: targetWidth,
        height: targetHeight,
      });
      webpResults.push({
        blob: webpBlob,
        name: `${filename}.webp`,
        width: targetWidth,
        height: targetHeight,
      });
    }

    return {
      images: {
        'image/avif': avifResults,
        'image/webp': webpResults,
      },
      width: image.width,
      height: image.height,
    };
  }
}
