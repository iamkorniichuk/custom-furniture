export type ImageFormat = 'image/avif' | 'image/webp';
export interface ImageSize {
  width: number;
  height: number;
}

export interface FixedImage extends ImageSize {
  src: string;
}
export interface ResponsiveImage extends ImageSize {
  paths: Record<ImageFormat, FixedImage[]>;
}
