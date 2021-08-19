import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLogoutButtonComponent } from './profile-logout-button.component';

describe('ProfileLogoutButtonComponent', () => {
  let component: ProfileLogoutButtonComponent;
  let fixture: ComponentFixture<ProfileLogoutButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileLogoutButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileLogoutButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
