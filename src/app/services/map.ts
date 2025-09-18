import { inject, Injectable } from '@angular/core';
import { GeoJsonObject } from 'geojson';
import { Map, LatLngExpression } from 'leaflet';

import { LeafletService } from './leaflet';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private leafletService = inject(LeafletService);

  createBaseMap(
    elementId: string,
    center: LatLngExpression,
    initialZoom = 5,
    isZoomEnabled = true,
  ): Map {
    const leafletMap = this.leafletService.L.map(elementId, {
      center: center,
      zoom: initialZoom,
      attributionControl: false,
    });

    if (!isZoomEnabled) {
      leafletMap.zoomControl.remove();
      leafletMap.touchZoom.disable();
      leafletMap.doubleClickZoom.disable();
      leafletMap.scrollWheelZoom.disable();
      leafletMap.boxZoom.disable();
      leafletMap.keyboard.disable();
    }
    this.leafletService.L.tileLayer(
      'https://cartodb-basemaps-a.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}{r}.png',
      { subdomains: 'abcd' },
    ).addTo(leafletMap);

    this.leafletService.L.tileLayer(
      'https://cartodb-basemaps-a.global.ssl.fastly.net/light_only_labels/{z}/{x}/{y}{r}.png',
      { subdomains: 'abcd' },
    ).addTo(leafletMap);

    return leafletMap;
  }

  addPolygons(map: Map, data: GeoJsonObject): Map {
    this.leafletService.L.geoJSON(data, {
      style: {
        color: 'black',
        weight: 2,
        fillColor: 'gray',
        fillOpacity: 0.4,
      },
    }).addTo(map);

    return map;
  }

  addMarker(map: Map, position: LatLngExpression): Map {
    const icon = new this.leafletService.L.Icon({
      iconUrl: 'images/icons/pin.png',
      iconSize: [50, 50],
      iconAnchor: [25, 50],
      popupAnchor: [0, -51],
      shadowUrl: '',
    });
    this.leafletService.L.marker(position, { icon: icon }).addTo(map);
    return map;
  }
}
