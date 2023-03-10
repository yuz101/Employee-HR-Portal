import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { Store } from '@ngrx/store';
import { Onboarding } from 'src/app/models/onboarding.model';
import { AppState } from '../../store/onboarding.state';
import { HttpClient } from '@angular/common/http';
import * as OnboardingActions from '../../store/actions/onboarding.actions';

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

    const userID = '63e5ca1801c88ecb8d82f400'
    this.http.get<Onboarding>(`http://localhost:3000/application/applicationID/${userID}`)
      .subscribe(response => {
        if (response.status && response.status === 'Pending') {
          this.showCarInformation = true;
          this.showDriversLicense = true;
          this.disableButton = true;

          this.onboardingForm.patchValue(response);
          this.onboardingForm.disable();

        }
        else if (response.status && response.status === 'Rejected') {
          this.showCarInformation = true;
          this.showDriversLicense = true;
          this.disableButton = true;

          this.onboardingForm.patchValue(response);
        }
        else if (response.status === 'Approved') {
          this.router.navigate(['/']);
        }


      });

    this.onboardingForm = this.formBuilder.group({
      userID: ['63e5ca1801c88ecb8d82f487'],
      status: ['Pending'],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.pattern("[a-zA-Z]+$")]],
      lastName: ['', [Validators.required, Validators.pattern("[a-zA-Z]+$")]],
      middleName: [''],
      address: this.formBuilder.group({
        streetName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9#\s]+$/)]],
        buildingNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
        city: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
        state: ['', [Validators.required, Validators.pattern("[a-zA-Z]+$")]],
        zip: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]]
      }),
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      workPhoneNumber: [''],
      carInformation: this.formBuilder.group({
        make: [''],
        model: [''],
        color: ['']
      }),
      SSN: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      birthday: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
      gender: ['', [Validators.required]],
      identifyType: this.formBuilder.group({
        visaTitle: ['', [Validators.required]],
        startDate: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
        endDate: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]]
      }),
      driversLicense: this.formBuilder.group({
        licenseNumber: ['', [Validators.pattern(/^[0-9]+$/) ]],
        expirationDate: ['', [Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]]
      }),
      reference: this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.pattern("[a-zA-Z]+$")]],
        lastName: ['', [Validators.required, Validators.pattern("[a-zA-Z]+$")]],
        middleName: ['', [Validators.pattern("[a-zA-Z]+$")]],
        phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
        email: ['', [Validators.required, Validators.email]],
        relationship: ['', [Validators.required, Validators.pattern("[a-zA-Z]+$")]]
      }),
      emergencyContacts: this.formBuilder.group({
        firstName: ['', [Validators.required, Validators.pattern("[a-zA-Z]+$")]],
        lastName: ['', [Validators.required, Validators.pattern("[a-zA-Z]+$")]],
        middleName: [''],
        phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
        email: ['', [Validators.required, Validators.email]],
        relationship: ['']
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
    if (event.target.value === 'F1') {
      this.showVisaFileUpload = true
    } else {
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


  //修改response之后的动作，跳转回主页面

  submitForm() {
    console.log(this.onboardingForm.value)
    this.http.post('http://localhost:3000/application/application', this.onboardingForm.value)
      .subscribe(response => {
        console.log(response);
        this.router.navigateByUrl('/');

      });
  }
}
