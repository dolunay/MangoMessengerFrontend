import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSidebarHeaderComponent } from './chat-sidebar-header.component';

describe('ChatSidebarHeaderComponent', () => {
  let component: ChatSidebarHeaderComponent;
  let fixture: ComponentFixture<ChatSidebarHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatSidebarHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatSidebarHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
