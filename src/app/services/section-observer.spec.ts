import { TestBed } from '@angular/core/testing';

import { SectionObserverService } from './section-observer';

describe('SectionObserverService', () => {
  let service: SectionObserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SectionObserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
