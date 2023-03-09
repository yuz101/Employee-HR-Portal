import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HouseListComponent } from './components/house-list/house-list.component';
import { HouseDetailComponent } from './components/house-detail/house-detail.component';
import { HouseService } from './services/house.service';
import { HouseAddComponent } from './components/house-add/house-add.component';
import { houseFeatureKey } from './store/reducers/house.reducers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/reducers/user.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { PasswordModule } from 'primeng/password'
import { FileUploadModule } from 'primeng/fileupload';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { StepsModule } from 'primeng/steps';
import { RadioButtonModule } from 'primeng/radiobutton';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { DataViewModule } from 'primeng/dataview';
// import { employeeReducer } from './store/employee.reducer';
// import { EmployeeState } from './store/employee.reducer';
import { employeesReducer } from './store/employee.reducer';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { VisaManagementHrComponent } from './components/visa-management-hr/visa-management-hr.component';
import { EmployeeHouseDetailComponent } from './components/employee-house-detail/employee-house-detail.component';
import { EmployeeProfilesComponent } from './components/employee-profiles/employee-profiles.component';
import { FilterPipe } from './pipes/filter.pipe';
import { DocumentReviewComponent } from './components/visa-management-hr/document-review/document-review.component';
import { RegistrationEmailsComponent } from './components/registration-emails/registration-emails.component';
import { OnboardingApplicationReviewComponent } from './components/onboarding-application-review/onboarding-application-review.component';

import { employeeWorkAuthorizationStatusRecordsReducer } from './store/reducers/employee-work-authorization-status-records.reducer';

import { InterceptorService } from './services/intercepter.service';
import { WorkAuthorizationManagementEmployeeComponent } from './components/work-authorization-management-employee/work-authorization-management-employee.component';

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
    HouseAddComponent,
    HouseListComponent,
    HouseDetailComponent,
    EmployeeHouseDetailComponent,
    EmployeeProfilesComponent,
    FilterPipe,
    DocumentReviewComponent,
    RegistrationEmailsComponent,
    OnboardingApplicationReviewComponent,
    WorkAuthorizationManagementEmployeeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
    // StoreModule.forRoot({ employees: employeesReducer, employee: userReducer, }),
    InputTextModule,
    ButtonModule,
    DialogModule,
    DynamicDialogModule,
    PasswordModule,
    FileUploadModule,
    InputMaskModule,
    CalendarModule,
    RadioButtonModule,
    BrowserAnimationsModule,
    TableModule,
    PdfViewerModule,
    InputTextareaModule,
    DataViewModule,
    ToolbarModule,
    DropdownModule,
    StepsModule,
    StoreModule.forRoot({
      user: userReducer,
      [houseFeatureKey]: userReducer,
      employeeWorkAuthorizationStatusRecords: employeeWorkAuthorizationStatusRecordsReducer,
      employees: employeesReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    HouseService
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }

