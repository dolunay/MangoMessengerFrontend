import { TestBed } from '@angular/core/testing';

import { UserChatsService } from './user-chats.service';

describe('UserchatsService', () => {
  let service: UserChatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserChatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
