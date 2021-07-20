import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatItemActiveComponent } from './chat-item-active.component';

describe('ChatItemActiveComponent', () => {
  let component: ChatItemActiveComponent;
  let fixture: ComponentFixture<ChatItemActiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatItemActiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatItemActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
