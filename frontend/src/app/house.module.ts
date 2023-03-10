import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HouseRoutingModule } from './house-routing.module';

import { HouseListComponent } from './components/house-list/house-list.component';
import { HouseDetailComponent } from './components/house-detail/house-detail.component';
import { HouseAddComponent } from './components/house-add/house-add.component';
import { EmployeeHouseDetailComponent } from './components/employee-house-detail/employee-house-detail.component';

import { HouseService } from './services/house.service';

import { RouterModule, Routes } from '@angular/router';

@NgModule({
  declarations: [HouseListComponent, HouseDetailComponent, HouseAddComponent, EmployeeHouseDetailComponent],
  imports: [CommonModule, FormsModule, HouseRoutingModule, ReactiveFormsModule],
  exports: [HouseListComponent],
})
export class HouseModule {} 