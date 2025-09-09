import countriesData from '../../assets/countries.json';

type GeometryType = 'Polygon' | 'MultiPolygon';

interface Geometry {
  type: GeometryType;
  coordinates: number[][][] | number[][][][];
}

interface Feature {
  type: 'Feature';
  properties: {
    name: string;
  };
  geometry: Geometry;
}

interface FeatureCollection {
  type: 'FeatureCollection';
  features: Feature[];
}

export const countries: FeatureCollection = countriesData as FeatureCollection;
