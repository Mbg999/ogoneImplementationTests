import { TestBed } from '@angular/core/testing';

import { OgoneService } from './ogone.service';

describe('OgoneService', () => {
  let service: OgoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OgoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
