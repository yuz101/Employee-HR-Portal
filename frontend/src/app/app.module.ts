// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { HttpClientModule } from '@angular/common/http';
// import { RouterModule, Routes } from '@angular/router';

// import { AppComponent } from './app.component';
// import { HouseListComponent } from './house/components/house-list/house-list.component';
// import { HouseDetailComponent } from './house/components/house-detail/house-detail.component';
// import { HouseService } from './services/house.service';
// import { HouseAddComponent } from './house/components/house-add/house-add.component';

// const appRoutes: Routes = [
//   { path: '', redirectTo: '/houses', pathMatch: 'full' },
//   { path: 'housing', component: HouseAddComponent },
//   { path: 'houses', component: HouseListComponent },
//   { path: 'houses/:id', component: HouseDetailComponent },
// ];

// @NgModule({
//   declarations: [
//     AppComponent
//   ],
//   imports: [
//     BrowserModule,
//     HttpClientModule,
//     RouterModule.forRoot(appRoutes)
//   ],
//   providers: [
//     HouseService
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { HouseListComponent } from './components/house-list/house-list.component';
import { HouseDetailComponent } from './components/house-detail/house-detail.component';
import { HouseService } from './services/house.service';
import { HouseAddComponent } from './components/house-add/house-add.component';
import { housesReducer } from './store/reducers/house.reducers';

const appRoutes: Routes = [
  { path: '', redirectTo: '/houses', pathMatch: 'full' },
  { path: 'housing', component: HouseAddComponent },
  { path: 'houses', component: HouseListComponent },
  { path: 'houses/:id', component: HouseDetailComponent },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot({ house: housesReducer }),
  ],
  providers: [HouseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
