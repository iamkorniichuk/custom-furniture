import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioDropdownComponent } from './portfolio-dropdown';

describe('PortfolioDropdownComponent', () => {
  let component: PortfolioDropdownComponent;
  let fixture: ComponentFixture<PortfolioDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioDropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
