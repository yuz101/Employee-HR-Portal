import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { VisaManagementHrComponent } from './components/visa-management-hr/visa-management-hr.component';
import { HouseListComponent } from './components/house-list/house-list.component';
import { HouseDetailComponent } from './components/house-detail/house-detail.component';
import { HouseAddComponent } from './components/house-add/house-add.component';
import { EmployeeHouseDetailComponent } from './components/employee-house-detail/employee-house-detail.component';


const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'onboarding', component: OnboardingComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'visa-management-hr', component: VisaManagementHrComponent },
  { path: 'housing', component: HouseAddComponent },
  { path: 'houses', component: HouseListComponent },
  { path: 'houses/:id', component: HouseDetailComponent },
  { path: 'employee/housing', component: EmployeeHouseDetailComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
