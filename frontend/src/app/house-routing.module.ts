import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HouseListComponent } from './components/house-list/house-list.component';
import { HouseDetailComponent } from './components/house-detail/house-detail.component';
import { HouseAddComponent } from './components/house-add/house-add.component';
import { EmployeeHouseDetailComponent } from './components/employee-house-detail/employee-house-detail.component';

const routes: Routes = [
    { path: 'housing', component: HouseAddComponent },
    { path: 'houses', component: HouseListComponent },
    { path: 'houses/:id', component: HouseDetailComponent },
    { path: 'employee/housing', component: EmployeeHouseDetailComponent},
  ];

@NgModule({
    declarations: [
        HouseAddComponent, 
        HouseListComponent, 
        HouseDetailComponent, 
        EmployeeHouseDetailComponent,
    ],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HouseRoutingModule {}