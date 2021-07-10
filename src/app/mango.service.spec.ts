import { TestBed } from '@angular/core/testing';

import { MangoService } from './mango.service';

describe('MangoService', () => {
  let service: MangoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MangoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
