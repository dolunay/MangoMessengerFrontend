import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteOthersDialogComponent } from './invite-others-dialog.component';

describe('InviteOthersDialogComponent', () => {
  let component: InviteOthersDialogComponent;
  let fixture: ComponentFixture<InviteOthersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteOthersDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteOthersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
