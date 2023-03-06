import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HouseListComponent } from './components/house-list/house-list.component';
import { HouseDetailComponent } from './components/house-detail/house-detail.component';
import { HouseAddComponent } from './components/house-add/house-add.component';

const routes: Routes = [
  {
    path: '',
    component: HouseListComponent,
  },
  {
    path: 'houses/add',
    component: HouseAddComponent,
  },
  {
    path: 'houses/:id',
    component: HouseDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HouseRoutingModule {}
