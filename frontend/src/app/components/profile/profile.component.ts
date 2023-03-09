import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Employee } from 'src/app/models/employee';
import { ProfileService } from 'src/app/services/profile.service';
import { MessageService } from 'primeng/api';
import { ProfileActions } from 'src/app/store/actions/profile.action';
import { selectProfile } from 'src/app/store/selectors/profile.selector';
import { Observable } from 'rxjs';
import { EmployeeDocumentService } from 'src/app/services/employee-document.service';
import { DocumentTypeEnum, EmployeeDocumentLink } from 'src/app/models/work-authorization-status';
import { WorkAuthorizationDocumentTypeEnum } from 'src/app/models/work-authorization-status';
import { WorkAuthorizationManagementEmployeeComponent } from '../work-authorization-management-employee/work-authorization-management-employee.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [MessageService]
})
export class ProfileComponent {

  form: FormGroup;

  uploadedFiles: File[] = [];

  profile$: Observable<Employee> = this.store.select(selectProfile);

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService, 
    private _router: Router, 
    private store: Store,
    private messageService: MessageService,
    private employeeDocumentService: EmployeeDocumentService,
  ) {}

  ngOnInit() {
    this.profileService.get().subscribe({
      next: (profile: Employee) => {
        this.form.patchValue(profile)
      }, error: (error) => {
        console.log(error);
      }
    })

    this.form = this.fb.group({
      username:['', Validators.required],
      email: ['', Validators.required],
      password:  ['', Validators.required], 
      firstName:  ['', Validators.required],
      middleName:  ['', Validators.required],
      lastName:  ['', Validators.required],
      preferredName:  ['', Validators.required],
      profilePicture:  ['', Validators.required],
      ssn: ['', Validators.required],
      address: this.fb.group({
          streetName:  ['', Validators.required],
          buildingNumber:  ['', Validators.required],
          city:  ['', Validators.required],
          state:  ['', Validators.required],
          zip:  ['', Validators.required]
      }),
      phoneNumber:  ['', Validators.required],
      dateOfBirth:  ['', Validators.required],
      gender:  ['', Validators.required],
      emergencyContact: this.fb.group({
          eFirstName: ['', Validators.required],
          eMiddleName: ['', Validators.required],
          eLastName: ['', Validators.required],
          ePhoneNumber: ['', Validators.required],
          eEmail: ['', Validators.required],
          eRelationship: ['', Validators.required],
      }),
      document: [[], Validators.required],
      employment: this.fb.group({
          startDate:  ['', Validators.required],
          endDate:  ['', Validators.required],
          visaTitle:  ['', Validators.required],
      })
    });
  }

  customUpload(event) {
      for(let file of event.files) {
        this.uploadedFiles.push(file);
      }
      this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

  save() {
    const employee: Employee = { ...this.form.getRawValue() };
    this.profileService.save(employee).subscribe({
      next: (profile: Employee) => {
        this.store.dispatch(ProfileActions.retrievedEmployeeProfile({ profile }));
      }, error: (error) => {
        console.log(error);
      }
    })
    
    this.uploadedFiles.map((file) => {
      console.log(file);
      this.employeeDocumentService.uploadDocument(file, WorkAuthorizationDocumentTypeEnum.OPT_RECEIPT).subscribe({
        next: (documentLink: EmployeeDocumentLink) => {
          console.log(documentLink);
        }
      })
    })
  }
  
}
