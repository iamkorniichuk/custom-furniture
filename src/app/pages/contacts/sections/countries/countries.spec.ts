import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesSectionComponents } from './countries';

describe('CountriesSectionComponents', () => {
  let component: CountriesSectionComponents;
  let fixture: ComponentFixture<CountriesSectionComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountriesSectionComponents],
    }).compileComponents();

    fixture = TestBed.createComponent(CountriesSectionComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
