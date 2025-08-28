import { TestBed } from '@angular/core/testing';

import { SectionObserver } from './section-observer';

describe('SectionObserver', () => {
  let service: SectionObserver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SectionObserver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
