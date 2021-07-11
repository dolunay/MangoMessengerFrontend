import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutAllComponent } from './logout-all.component';

describe('LogoutAllComponent', () => {
  let component: LogoutAllComponent;
  let fixture: ComponentFixture<LogoutAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoutAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
