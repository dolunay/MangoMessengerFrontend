import { TestBed } from '@angular/core/testing';

import { RandomGeneratorService } from './random-generator.service';

describe('RandomGeneratorService', () => {
  let service: RandomGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
