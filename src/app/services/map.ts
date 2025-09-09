import { Injectable } from '@angular/core';
import { GeoJsonObject } from 'geojson';
import {
  Map,
  map,
  tileLayer,
  geoJSON,
  LatLngExpression,
  marker,
  Icon,
} from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  createBaseMap(
    elementId: string,
    center: LatLngExpression,
    initialZoom = 5,
    isZoomEnabled = true,
  ): Map {
    const leafletMap = map(elementId, {
      center: center,
      zoom: initialZoom,
      zoomControl: false,
    });

    if (!isZoomEnabled) {
      leafletMap.touchZoom.disable();
      leafletMap.doubleClickZoom.disable();
      leafletMap.scrollWheelZoom.disable();
      leafletMap.boxZoom.disable();
      leafletMap.keyboard.disable();
    }
    tileLayer(
      'https://cartodb-basemaps-a.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}{r}.png',
      { subdomains: 'abcd' },
    ).addTo(leafletMap);

    tileLayer(
      'https://cartodb-basemaps-a.global.ssl.fastly.net/light_only_labels/{z}/{x}/{y}{r}.png',
      { subdomains: 'abcd' },
    ).addTo(leafletMap);

    return leafletMap;
  }

  addPolygons(map: Map, data: GeoJsonObject): Map {
    geoJSON(data, {
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
    const icon = new Icon({
      iconUrl: 'images/icons/pin.png',
      iconSize: [50, 50],
      iconAnchor: [25, 50],
      popupAnchor: [0, -51],
      shadowUrl: '',
    });
    marker(position, { icon: icon }).addTo(map);
    return map;
  }
}
