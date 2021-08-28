import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyEmailNoteComponent } from './verify-email-note.component';

describe('VerifyEmailNoteComponent', () => {
  let component: VerifyEmailNoteComponent;
  let fixture: ComponentFixture<VerifyEmailNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyEmailNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyEmailNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
