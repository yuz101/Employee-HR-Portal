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
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
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
import { EmployeeHouseDetailComponent } from './components/employee-house-detail/employee-house-detail.component';
import { EmployeeProfilesComponent } from './components/employee-profiles/employee-profiles.component';
import { FilterPipe } from './pipes/filter.pipe';
import { DocumentReviewComponent } from './components/visa-management-hr/document-review/document-review.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
    StoreModule.forRoot({ [houseFeatureKey]: userReducer }),
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
export class AppModule { }
