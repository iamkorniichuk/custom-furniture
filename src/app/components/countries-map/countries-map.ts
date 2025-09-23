import { AfterViewInit, Component, inject } from '@angular/core';

import { countries } from '../../shared/countries';
import { MapService } from '../../services/map';

@Component({
  selector: 'app-countries-map',
  imports: [],
  templateUrl: './countries-map.html',
})
export class CountriesMapComponent implements AfterViewInit {
  private map = inject(MapService);

  ngAfterViewInit() {
    const baseMap = this.map.createBaseMap(
      'countriesMap',
      [51.5, 14.5],
      5,
      false,
    );
    this.map.addPolygons(baseMap, countries);
  }
}
