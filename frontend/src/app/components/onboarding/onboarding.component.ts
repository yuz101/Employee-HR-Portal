import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { Store } from '@ngrx/store';
import { Onboarding } from 'src/app/models/onboarding.model';
import { EmployeeDocumentService } from 'src/app/services/employee-document.service';
import { AppState } from '../../store/onboarding.state';
import { HttpClient } from '@angular/common/http';
import * as OnboardingActions from '../../store/actions/onboarding.actions';
import { MessageService } from 'primeng/api';
import { ProfileService } from 'src/app/services/profile.service';
import { Employee } from 'src/app/models/employee';
import { DocumentTypeEnum, EmployeeDocumentLink } from 'src/app/models/work-authorization-status';
import { WorkAuthorizationDocumentTypeEnum } from 'src/app/models/work-authorization-status';



@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css'],
  providers: [MessageService]
})
export class OnboardingComponent implements OnInit {
  onboardingForm: FormGroup;
  form: FormGroup;
  showCarInformation = false;
  showDriversLicense = false;
  showVisaFileUpload = false;
  disableButton = false;

  DocumentTypeEnum = DocumentTypeEnum;

  WorkAuthorizationDocumentTypeEnum = WorkAuthorizationDocumentTypeEnum;

  uploadedFiles: [File, DocumentTypeEnum | WorkAuthorizationDocumentTypeEnum][] = [];

  profile: File;

  profilePreview: EmployeeDocumentLink;

  driverLicense: File;

  driverLicensePreview: EmployeeDocumentLink;

  driverLicenseDialog: boolean = false;

  selectedWorkAuthorizationType: {name: string, type: WorkAuthorizationDocumentTypeEnum}
  
  i_20: File;

  i_20Preview: EmployeeDocumentLink;

  i_20Dialog: boolean = false;

  i_983: File;

  i_983Preview: EmployeeDocumentLink;

  i_983Dialog: boolean = false;

  optReceipt: File;

  optReceiptPreview: EmployeeDocumentLink;

  optReceiptDialog: boolean = false;

  optEad: File;

  optEadPreview: EmployeeDocumentLink;

  optEadDialog: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private http: HttpClient,
    private profileService: ProfileService,
    private messageService: MessageService,
    private router: Router,
    private employeeDocumentService: EmployeeDocumentService,

  ) { }

  //下面部分的userID需要修改为存在jwt里的userID


  ngOnInit() {

    this.http.get<Onboarding>(`http://localhost:3000/application/applicationPID`)
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
        else {
          this.profileService.get().subscribe({
            next: (profile: Employee) => {
              this.onboardingForm.patchValue(profile)
            }, error: (error) => {
              console.log(error);
            }
          })
        }

      });

    this.onboardingForm = this.formBuilder.group({
      userID: [''],
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
        licenseNumber: ['', [Validators.pattern(/^[0-9]+$/)]],
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

  customUpload(event, type: DocumentTypeEnum | WorkAuthorizationDocumentTypeEnum) {
    console.log(type)
     for(let file of event.files) {
         switch (type) {
          case DocumentTypeEnum.PROFILE:
            this.profile = file;
            this.uploadedFiles.push([this.profile, type]);
            break;
          case DocumentTypeEnum.DRIVER_LICENSE:
            this.driverLicense = file;
            this.uploadedFiles.push([this.driverLicense, type]);
            break;
          case WorkAuthorizationDocumentTypeEnum.OPT_RECEIPT:
            this.optReceipt = file;
            this.uploadedFiles.push([this.optReceipt, type]);
            break;
          case WorkAuthorizationDocumentTypeEnum.OPT_EAD:
            this.optEad = file;
            this.uploadedFiles.push([this.optEad, type]);
            break;
          case WorkAuthorizationDocumentTypeEnum.I_20:
            this.i_20 = file;
            this.uploadedFiles.push([this.i_20, type]);
            break;
          case WorkAuthorizationDocumentTypeEnum.I_983:
            this.i_983 = file;
            this.uploadedFiles.push([this.i_983, type]);
            break;
          default:
            break;
        }
    }
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

  // onDirverFileChange(event) {
  //   const file = event.target.files[0];
  //   // ... handle the file upload
  // }

  // onBasicUpload(event) {
  //   //handle file upload
  // }


  //修改response之后的动作，跳转回主页面

  submitForm() {
    console.log(this.onboardingForm.value)
    this.uploadedFiles.map((item) => {
      console.log(item);
      this.employeeDocumentService.uploadDocument(item[0], item[1]).subscribe({
        next: (documentLink: EmployeeDocumentLink) => {
          console.log(documentLink);
        }
      })
    })
    this.http.post('http://localhost:3000/application/application', this.onboardingForm.value)
      .subscribe(response => {
        console.log(response);
        // window.location.reload();

      });
  }
}
