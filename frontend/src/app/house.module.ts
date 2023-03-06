import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HouseRoutingModule } from './house-routing.module';

import { HouseListComponent } from './components/house-list/house-list.component';
import { HouseDetailComponent } from './components/house-detail/house-detail.component';
import { HouseAddComponent } from './components/house-add/house-add.component';
// import { HouseEditComponent } from './components/house-edit/house-edit.component';

import { HouseService } from './services/house.service';

import { RouterModule, Routes } from '@angular/router';

export interface House {
  _id?: string;
  address: {
    streetName: string;
    buildingNumber: string;
    city: string;
    state: string;
    zip: string;
  };
  landlord: {
    fullName: string;
    phoneNumber: string;
    email: string;
  };
  facility: {
    beds: number;
    mattresses: number;
    tables: number;
    chairs: number;
  };
  residents?: number;
  roommates?: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
  }[];
  reports?: string[];
}
export interface HouseResponse {
  message: string;
  house: House;
}

@NgModule({
  declarations: [HouseListComponent, HouseDetailComponent, HouseAddComponent],
  imports: [CommonModule, FormsModule, HouseRoutingModule, ReactiveFormsModule],
  exports: [HouseListComponent],
})
export class HouseModule {}
