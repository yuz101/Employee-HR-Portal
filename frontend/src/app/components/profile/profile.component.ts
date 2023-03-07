import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Employee } from 'src/app/models/employee';
import { ProfileService } from 'src/app/services/profile.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [MessageService]
})
export class ProfileComponent {

  form: FormGroup;
  uploadedFiles: any[] = [];

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService, 
    private _router: Router, 
    private store: Store,
    private messageService: MessageService
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

  onUpload(event) {
      for(let file of event.files) {
          this.uploadedFiles.push(file);
      }
      this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

  save() {
    const employee: Employee = { ...this.form.getRawValue() };
    console.log(employee);
    this.profileService.save(employee).subscribe({
      next: (profile: Employee) => {
        console.log(profile);
        this._router.navigateByUrl('/profile');
      }, error: (error) => {
        console.log(error);
      }
    })
  }
  
}
