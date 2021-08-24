import { TestBed } from '@angular/core/testing';

import { RequestHeaderInterceptor } from './request-header.interceptor';

describe('RequestHeaderInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RequestHeaderInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RequestHeaderInterceptor = TestBed.inject(RequestHeaderInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
