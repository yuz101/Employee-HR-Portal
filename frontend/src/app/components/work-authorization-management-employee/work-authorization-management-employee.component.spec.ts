import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAuthorizationManagementEmployeeComponent } from './work-authorization-management-employee.component';

describe('WorkAuthorizationManagementEmployeeComponent', () => {
  let component: WorkAuthorizationManagementEmployeeComponent;
  let fixture: ComponentFixture<WorkAuthorizationManagementEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkAuthorizationManagementEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkAuthorizationManagementEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
