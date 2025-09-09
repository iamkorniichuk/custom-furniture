import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { CountriesMapComponent } from '../../../../components/countries-map/countries-map';

@Component({
  selector: 'app-countries',
  imports: [CountriesMapComponent, TranslatePipe],
  templateUrl: './countries.html',
  styleUrl: './countries.css',
})
export class CountriesComponents {}
