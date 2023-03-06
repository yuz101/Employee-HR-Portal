import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeHouseDetailComponent } from './employee-house-detail.component';

describe('EmployeeHouseDetailComponent', () => {
  let component: EmployeeHouseDetailComponent;
  let fixture: ComponentFixture<EmployeeHouseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeHouseDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeHouseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
