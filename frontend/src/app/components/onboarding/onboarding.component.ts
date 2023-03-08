import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router'
import { Store } from '@ngrx/store';
import { Onboarding } from 'src/app/models/onboarding.model';
import { AppState } from '../../store/onboarding.state';
import { HttpClient } from '@angular/common/http';
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
  disableButton = false;
  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private http: HttpClient,
    private router: Router
  ) { }

  //下面部分的userID需要修改为存在jwt里的userID

  ngOnInit() {

    const userID = '63e5ca1801c88ecb8d82f401'
    this.http.get<Onboarding>(`http://localhost:3000/application/applicationID/${userID}`)
      .subscribe(response => {
        if (response.status&&response.status === 'Pending') {
          this.showCarInformation = true;
          this.showDriversLicense = true;
          this.disableButton = true;
          
          this.onboardingForm.patchValue(response);
          this.onboardingForm.disable();

        }
        else if(response.status&&response.status === 'Rejected'){
          this.showCarInformation = true;
          this.showDriversLicense = true;
          this.disableButton = true;
          
          this.onboardingForm.patchValue(response);
        }
        else if(response.status === 'Approved'){
          this.router.navigate(['/']);
        }
        

      });

    this.onboardingForm = this.formBuilder.group({
      userID: ['63e5ca1801c88ecb8d82f487'],
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

  onUpload(event) {
    // for(let file of event.files) {
    //     this.uploadedFiles.push(file);
    // }
    // this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
}


  onVisaFileChange(event) {
    console.log(event.target.value)
    if(event.target.value === 'F1'){
      this.showVisaFileUpload = true
    }else{
      this.showVisaFileUpload = false
    }
    // const file = event.target.files[0];
    // ... handle the file upload
  }

  onDirverFileChange(event) {
    const file = event.target.files[0];
    // ... handle the file upload
  }

  onBasicUpload(event) {
    //handle file upload
  }

  submitForm() {
    console.log(this.onboardingForm.value)
    this.http.post('http://localhost:3000/application/application', this.onboardingForm.value)
      .subscribe(response => {
        console.log(response);
      });
    // this.store.dispatch(new OnboardingActions.AddOnboarding({ onboarding: this.onboardingForm.value }));
  }
}
