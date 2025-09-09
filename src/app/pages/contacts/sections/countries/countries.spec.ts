import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesComponents } from './countries';

describe('CountriesComponents', () => {
  let component: CountriesComponents;
  let fixture: ComponentFixture<CountriesComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountriesComponents],
    }).compileComponents();

    fixture = TestBed.createComponent(CountriesComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
