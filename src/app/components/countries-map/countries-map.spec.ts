import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesMapComponent } from './countries-map';

describe('CountriesMapComponent', () => {
  let component: CountriesMapComponent;
  let fixture: ComponentFixture<CountriesMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountriesMapComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CountriesMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
