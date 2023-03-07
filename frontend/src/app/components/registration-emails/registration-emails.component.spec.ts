import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationEmailsComponent } from './registration-emails.component';

describe('RegistrationEmailsComponent', () => {
  let component: RegistrationEmailsComponent;
  let fixture: ComponentFixture<RegistrationEmailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationEmailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationEmailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
