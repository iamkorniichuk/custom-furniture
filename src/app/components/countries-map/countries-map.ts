import { AfterViewInit, Component, Input } from '@angular/core';
import { Map, map, tileLayer, geoJSON } from 'leaflet';

import { countries } from '../../shared/countries';

@Component({
  selector: 'app-countries-map',
  imports: [],
  templateUrl: './countries-map.html',
  styleUrl: './countries-map.css',
})
export class CountriesMapComponent implements AfterViewInit {
  @Input() class = 'w-3 h-3';
  private map!: Map;

  ngAfterViewInit() {
    this.map = map('map', {
      center: [51.5, 14.5],
      zoom: 5,
      zoomControl: false,
    });
    this.map.touchZoom.disable();
    this.map.doubleClickZoom.disable();
    this.map.scrollWheelZoom.disable();
    this.map.boxZoom.disable();
    this.map.keyboard.disable();

    tileLayer(
      'https://cartodb-basemaps-a.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}{r}.png',
      {
        subdomains: 'abcd',
      },
    ).addTo(this.map);
    tileLayer(
      'https://cartodb-basemaps-a.global.ssl.fastly.net/light_only_labels/{z}/{x}/{y}{r}.png',
      {
        subdomains: 'abcd',
      },
    ).addTo(this.map);

    geoJSON(countries, {
      style: {
        color: 'black',
        weight: 2,
        fillColor: 'gray',
        fillOpacity: 0.4,
      },
    }).addTo(this.map);
  }
}
