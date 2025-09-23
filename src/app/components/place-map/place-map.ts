import { AfterViewInit, Component, inject } from '@angular/core';

import { MapService } from '../../services/map';

@Component({
  selector: 'app-place-map',
  imports: [],
  templateUrl: './place-map.html',
})
export class PlaceMapComponent implements AfterViewInit {
  private map = inject(MapService);

  ngAfterViewInit() {
    const baseMap = this.map.createBaseMap(
      'placeMap',
      [50.904, 15.721],
      15,
      false,
    );
    this.map.addMarker(baseMap, [50.904, 15.721]);
  }
}
