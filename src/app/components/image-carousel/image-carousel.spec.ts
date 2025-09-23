import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCarouseComponent } from './image-carousel';

describe('ImageCarouseComponent', () => {
  let component: ImageCarouseComponent;
  let fixture: ComponentFixture<ImageCarouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageCarouseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageCarouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
