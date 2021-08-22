import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteOthersComponent } from './invite-others.component';

describe('InviteOthersComponent', () => {
  let component: InviteOthersComponent;
  let fixture: ComponentFixture<InviteOthersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteOthersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteOthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
