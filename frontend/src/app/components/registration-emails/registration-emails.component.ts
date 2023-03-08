import { Component } from '@angular/core';
import { RegistrationEmailsService } from 'src/app/services/registration-emails.service';
import { RegistrationEmail, RegistrationEmailResponse, RegistrationEmailsResponse } from 'src/app/models/registration-email';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-emails',
  templateUrl: './registration-emails.component.html',
  styleUrls: ['./registration-emails.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class RegistrationEmailsComponent {
    form: FormGroup;

    registrationEmails: RegistrationEmail[];

    registrationEmail: RegistrationEmail;

    selectedRegistrationEmails: RegistrationEmail[];

    submitted: boolean;

    registrationDialog: boolean;


    constructor(
      private fb: FormBuilder,
      private registrationEmailsService : RegistrationEmailsService, 
      private messageService: MessageService, 
      private confirmationService: ConfirmationService
    ) { 
      this.form = this.fb.group({
        firstName:['', Validators.required],
        middleName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
      })
    }

    ngOnInit() {
        this.registrationEmailsService.getRegistrationEmails().subscribe({
            next: (response: RegistrationEmailsResponse) => {
                this.registrationEmails = response.registrationEmails;
                for(let i = 0; i < this.registrationEmails.length; i++) {
                  const expirationDate  = Date.parse(this.registrationEmails[i].expiration)
                  const currDate = new Date().getTime()
                    if(expirationDate < currDate) {
                        this.registrationEmails[i].status = "expired";
                        this.registrationEmailsService.updateRegistrationEmail(this.registrationEmails[i]).subscribe({
                            next: (response: RegistrationEmailResponse) => {
                              console.log(response);
                                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Registration Record Updated', life: 3000});
                            }, error: (error) => {
                                console.log(error);
                            }
                        })
                    }
                }
            }, error: (error) => {
                console.log(error);
            }
        })
    }

    resendEmail(id: string) {
      this.registrationEmailsService.resendRegistrationEmails(id).subscribe({
        next: (response: RegistrationEmailResponse) => {
          this.registrationEmails.map((registrationEmail, index) => {
            if(registrationEmail._id === id) {
             this.registrationEmails[index] = response.registrationEmail
            }
          })
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Registration Email Sent', life: 3000});
        }, error: (error) => {
          console.log(error);
        }
      })
    }

    addNew() {
        this.submitted = false;
        this.registrationDialog = true;
    }

    deleteSelectedRegistration() {
        // this.registrationEmailsService.deleteRegistrationEmails(this.selectedRegistrationEmails).subscribe({
        //     next: (response: RegistrationEmailsResponse) => {
        //         this.messageService.add({severity:'success', summary: 'Successful', detail: 'Registration Record Deleted', life: 3000});
        //     }, error: (error) => {
        //         console.log(error);
        //     }
        // })
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.registrationEmails = this.registrationEmails.filter(val => !this.registrationEmails.includes(val));
                this.selectedRegistrationEmails = [];
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Registration Record Deleted', life: 3000});
            }
        });
    }

    hideDialog() {
        this.registrationDialog = false;
        this.submitted = false;
    }

    sendEmail() {
        this.submitted = true;
        this.registrationEmailsService.sendRegistrationEmails(this.form.getRawValue().firstName, this.form.getRawValue().middleName, this.form.getRawValue().lastName, this.form.getRawValue().email).subscribe({
            next: (response: RegistrationEmailResponse) => {
                this.registrationEmails.push(response.registrationEmail);
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Registration Email Sent', life: 3000});
            }, error: (error) => {
                console.log(error);
            }
        })
        this.registrationDialog = false;
    }
}
