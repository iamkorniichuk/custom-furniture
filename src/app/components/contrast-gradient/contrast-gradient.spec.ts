import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContrastGradientComponent } from './contrast-gradient';

describe('ContrastGradientComponent', () => {
  let component: ContrastGradientComponent;
  let fixture: ComponentFixture<ContrastGradientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContrastGradientComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContrastGradientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
