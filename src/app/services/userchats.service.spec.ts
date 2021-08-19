import { TestBed } from '@angular/core/testing';

import { UserchatsService } from './userchats.service';

describe('UserchatsService', () => {
  let service: UserchatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserchatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
