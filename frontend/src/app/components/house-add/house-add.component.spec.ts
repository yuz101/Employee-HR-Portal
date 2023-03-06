import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseAddComponent } from './house-add.component';

describe('HouseAddComponent', () => {
  let component: HouseAddComponent;
  let fixture: ComponentFixture<HouseAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
