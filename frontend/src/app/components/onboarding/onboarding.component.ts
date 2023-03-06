import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/onboarding.state';
import * as OnboardingActions from '../../store/onboarding.actions';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent implements OnInit {
  onboardingForm: FormGroup;
  showCarInformation = false;
  showDriversLicense = false;
  showVisaFileUpload = false;
  // visaTitleOptions = [
  //   { label: 'H1b', value: 'H1b' },
  //   { label: 'L2', value: 'L2' },
  //   { label: 'F1', value: 'F1' },
  //   { label: 'H4', value: 'H4' },
  //   { label: 'Other', value: 'Other' }
  // ];


  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.onboardingForm = this.formBuilder.group({
      userID: [''],
      status: ['Pending'],
      email: ['test@gmail.com', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      middleName: [''],
      address: this.formBuilder.group({
        streetName: ['', Validators.required],
        buildingNumber: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required]
      }),
      phoneNumber: ['', [Validators.required]],
      workPhoneNumber: [''],
      carInformation: this.formBuilder.group({
        make: [''],
        model: [''],
        color: ['']
      }),
      SSN: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      identifyType: this.formBuilder.group({
        visaTitle: ['', [Validators.required]],
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]]
      }),
      driversLicense: this.formBuilder.group({
        licenseNumber: ['', [Validators.required]],
        expirationDate: ['', [Validators.required]]
      }),
      reference: this.formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        middleName: [''],
        phoneNumber: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        relationship: ['', [Validators.required]]
      }),
      emergencyContacts: this.formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        middleName: [''],
        phoneNumber: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        relationship: ['', [Validators.required]]
      })
    });
    

  }

  onCarInformationChange(event) {
    this.showCarInformation = event.target.value === 'yes';
  }

  onDriversLicenseChange(event) {
    this.showDriversLicense = event.target.value === 'yes';
  }


  onVisaFileChange(event){
    const file = event.target.files[0];
     // ... handle the file upload
  }

  onDirverFileChange(event) {
    const file = event.target.files[0];
    // ... handle the file upload
  }

  onBasicUpload(event){
    //handle file upload
  }

  submitForm() {
    this.store.dispatch(new OnboardingActions.AddOnboarding({ onboarding: this.onboardingForm.value }));
  }
}
