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
import { EmployeeProfilesComponent } from './components/employee-profiles/employee-profiles.component';
import { RegistrationEmailsComponent } from './components/registration-emails/registration-emails.component';
import { OnboardingApplicationReviewComponent } from './components/onboarding-application-review/onboarding-application-review.component';
import { WorkAuthorizationManagementEmployeeComponent } from './components/work-authorization-management-employee/work-authorization-management-employee.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  { path: 'onboarding', component: OnboardingComponent, canActivate: [AuthGuardService] },
  { path: 'auth/signup', component: SignupComponent},
  { path: 'auth/login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  { path: 'registration-emails', component: RegistrationEmailsComponent,canActivate: [AuthGuardService] },
  { path: 'onboarding-application-review', component: OnboardingApplicationReviewComponent, canActivate: [AuthGuardService]},
  { path: 'visa-management-hr', component: VisaManagementHrComponent, canActivate: [AuthGuardService]},
  { path: 'housing', component: HouseAddComponent, canActivate: [AuthGuardService]},
  { path: 'houses', component: HouseListComponent, canActivate: [AuthGuardService]},
  { path: 'houses/:id', component: HouseDetailComponent, canActivate: [AuthGuardService]},
  { path: 'employee/housing', component: EmployeeHouseDetailComponent, canActivate: [AuthGuardService]},
  { path: 'profiles', component: EmployeeProfilesComponent, canActivate: [AuthGuardService]},
  { path: 'employees/:id', component: EmployeeProfilesComponent, canActivate: [AuthGuardService]},
  { path: 'work-authorization-management', component: WorkAuthorizationManagementEmployeeComponent, canActivate: [AuthGuardService]},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
