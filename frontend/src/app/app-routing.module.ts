import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { VisaManagementHrComponent } from './components/visa-management-hr/visa-management-hr.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'onboarding', component: OnboardingComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'visa-management-hr', component: VisaManagementHrComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
