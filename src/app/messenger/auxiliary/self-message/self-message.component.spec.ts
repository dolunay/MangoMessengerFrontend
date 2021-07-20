import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfMessageComponent } from './self-message.component';

describe('SelfMessageComponent', () => {
  let component: SelfMessageComponent;
  let fixture: ComponentFixture<SelfMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
