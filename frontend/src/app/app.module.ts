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
import { RouterModule, Routes } from '@angular/router';


import { HouseListComponent } from './components/house-list/house-list.component';
import { HouseDetailComponent } from './components/house-detail/house-detail.component';
import { HouseService } from './services/house.service';
import { HouseAddComponent } from './components/house-add/house-add.component';
import { housesReducer } from './store/reducers/house.reducers';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/user.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { PasswordModule } from 'primeng/password'
import { FileUploadModule } from 'primeng/fileupload';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { VisaManagementHrComponent } from './components/visa-management-hr/visa-management-hr.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/houses', pathMatch: 'full' },
  { path: 'housing', component: HouseAddComponent },
  { path: 'houses', component: HouseListComponent },
  { path: 'houses/:id', component: HouseDetailComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    OnboardingComponent,
    LoginComponent,
    ProfileComponent,
    VisaManagementHrComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot({ house: housesReducer }),
    InputTextModule,
    ButtonModule,
    PasswordModule,
    FileUploadModule,
    InputMaskModule,
    CalendarModule,
    RadioButtonModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      employee: userReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
  ],
  providers: [HouseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
