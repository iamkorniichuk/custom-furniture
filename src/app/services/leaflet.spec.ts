import { TestBed } from '@angular/core/testing';

import { LeafletService } from './leaflet';

describe('LeafletService', () => {
  let service: LeafletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeafletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
