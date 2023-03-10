import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router'
import { ConfirmationService } from 'primeng/api';
import { Onboarding } from 'src/app/models/onboarding.model';
import { OnboardingApplicationReviewService } from 'src/app/services/onboarding-application-review.service';
import { OnboardingApplicationService } from 'src/app/services/onboarding-application.service';
import { EmployeeDocumentService } from 'src/app/services/employee-document.service';
import { DocumentTypeEnum, EmployeeDocumentLink } from 'src/app/models/work-authorization-status';
import { WorkAuthorizationDocumentTypeEnum } from 'src/app/models/work-authorization-status';

@Component({
  selector: 'app-onboarding-application-review',
  templateUrl: './onboarding-application-review.component.html',
  styleUrls: ['./onboarding-application-review.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class OnboardingApplicationReviewComponent {
[x: string]: any;
  onboardingForm: FormGroup;

  applications: Onboarding[];

  applicationDialog: boolean = false;

  loading: boolean = true;

  eachUserID: string;

  hideButton: boolean = false

  statuses: any[];

  showCarInformation = true;
  showDriversLicense = true;
  showVisaFileUpload = true;
  disableButton = true;

  DocumentTypeEnum = DocumentTypeEnum;

  WorkAuthorizationDocumentTypeEnum = WorkAuthorizationDocumentTypeEnum;

  profilePreview: EmployeeDocumentLink;

  driverLicensePreview: EmployeeDocumentLink;
  driverLicenseDialog: boolean = false;

  optReceiptPreview: EmployeeDocumentLink;
  optReceiptDialog: boolean = false;

  constructor(
    private fb: FormBuilder,
    private onboardingApplicationReviewService : OnboardingApplicationReviewService, 
    private onboardingApplicationService: OnboardingApplicationService,
    private messageService: MessageService, 
    private confirmationService: ConfirmationService, 
    private employeeDocumentService: EmployeeDocumentService,
    private router: Router,

  ) {
     this.onboardingForm = this.fb.group({
      userID: [''],
      status: [''],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      middleName: [''],
      address: this.fb.group({
        streetName: ['', Validators.required],
        buildingNumber: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required]
      }),
      phoneNumber: ['', [Validators.required]],
      workPhoneNumber: [''],
      carInformation: this.fb.group({
        make: [''],
        model: [''],
        color: ['']
      }),
      SSN: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      identifyType: this.fb.group({
        visaTitle: ['', [Validators.required]],
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]]
      }),
      driversLicense: this.fb.group({
        licenseNumber: ['', [Validators.required]],
        expirationDate: ['', [Validators.required]]
      }),
      reference: this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        middleName: [''],
        phoneNumber: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        relationship: ['', [Validators.required]]
      }),
      emergencyContacts: this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        middleName: [''],
        phoneNumber: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        relationship: ['', [Validators.required]]
      })
    });

    this.statuses = [
        {label: 'Approved', value: 'approved'},
        {label: 'Rejected', value: 'rejected'},
        {label: 'Pending', value: 'pending'},
    ]
  }

  ngOnInit(): void {
    this.onboardingApplicationService.getAllApplications().subscribe({
      next: (applications: Onboarding[]) => {
        this.applications = applications;
        this.loading = false;
        console.log(this.applications)
      }, error: (error) => {
        console.log(error);
      }
    })
  }

  showDocumentDialog(type: DocumentTypeEnum | WorkAuthorizationDocumentTypeEnum) {
    switch (type) {
      case DocumentTypeEnum.DRIVER_LICENSE:
        this.driverLicenseDialog = true;
        break;
      case WorkAuthorizationDocumentTypeEnum.OPT_RECEIPT:
        this.optReceiptDialog = true;
        break;
    }
  }

  viewApplication(userID: string) {
    console.log(userID)
    this.applicationDialog = true;
    this.onboardingApplicationService.getOnboardingApplicationByID(userID).subscribe({
      next: (application: Onboarding) => {
        this.onboardingForm.patchValue(application);
        this.onboardingForm.disable();
        this.eachUserID = application.userID
        this.loading = false;
        if(application.status == "Approved" || application.status == "Rejected"){
          this.hideButton = true
        }
        else{
          this.hideButton = false
        }
      }, error: (error) => {
        console.log(error);
      }
    })

    this.employeeDocumentService.getAllDocuments(userID).subscribe({
      next: (documents: EmployeeDocumentLink[]) => {
        console.log(documents)
        let downloadLinks = documents['downloadLinks']
        console.log(downloadLinks);
        for (let i = 0; i < downloadLinks.length; i++) {
          if(downloadLinks[i].fileName === 'profile.jpg') {
            this.profilePreview = downloadLinks[i];
          } else if(downloadLinks[i].fileName === 'driver-license.pdf') {
            this.driverLicensePreview = downloadLinks[i];
          } else if(downloadLinks[i].fileName === 'opt-receipt.pdf') {
            this.optReceiptPreview = downloadLinks[i];
          } else {
            console.log('No file found');
          }
        }
      }, error: (error) => {
        console.log(error);
      }
    })
  }

  approveApplication(userID: string) {
    this.applicationDialog = false;
    console.log(userID)
    this.onboardingApplicationReviewService.approveApplication(userID).subscribe({
      next: (application: Onboarding) => {
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Application Approved'});
        this.loading = false;
        window.location.reload();
      }, error: (error) => {
        console.log(error);
      }
    })

  }

  rejectApplication(userID: string) {
    this.applicationDialog = false;
    console.log(userID)
    this.onboardingApplicationReviewService.rejectApplication(userID).subscribe({
      next: (application: Onboarding) => {
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Application Rejected'});
        this.loading = false;
        window.location.reload();
      }, error: (error) => {
        console.log(error);
      }
    })

  }

}
