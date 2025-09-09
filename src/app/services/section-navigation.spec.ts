import { TestBed } from '@angular/core/testing';

import { SectionNavigationService } from './section-navigation';

describe('SectionNavigationService', () => {
  let service: SectionNavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SectionNavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
