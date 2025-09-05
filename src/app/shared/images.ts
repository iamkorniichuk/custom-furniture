export interface ImagePaths {
  original: string;
  xlarge: string;
  large: string;
  medium: string;
  small: string;
}

export interface Image {
  orientation: 'portrait' | 'landscape';
  paths: ImagePaths;
}
