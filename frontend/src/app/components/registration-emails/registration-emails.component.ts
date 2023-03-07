import { Component } from '@angular/core';
import { RegistrationEmailsService } from 'src/app/services/registration-emails.service';
import { RegistrationEmail, RegistrationEmailResponse } from 'src/app/models/registration-email';
import { SelectItem } from "primeng/api";
import { PrimeNGConfig } from "primeng/api";

@Component({
  selector: 'app-registration-emails',
  templateUrl: './registration-emails.component.html',
  styleUrls: ['./registration-emails.component.css']
})
export class RegistrationEmailsComponent {
    registrationEmails: RegistrationEmail[];

    sortOptions: SelectItem[];

    sortOrder: number;

    sortField: string;

    constructor(private registrationEmailsService : RegistrationEmailsService) { }

    productNames: string[] = [
    "GeeksforGeeks",
    "GeeksforGeeks",
    "GeeksforGeeks",
    "GeeksforGeeks",
    "GeeksforGeeks",
    "GeeksforGeeks",
    "GeeksforGeeks",
    "GeeksforGeeks",
    "GeeksforGeeks",
    "GeeksforGeeks",
    "GeeksforGeeks",
    "GeeksforGeeks",
    "GeeksforGeeks",
  ];

    ngOnInit() {
        this.registrationEmailsService.getRegistrationEmails().subscribe({
            next: (response: RegistrationEmailResponse) => {
                this.registrationEmails = response.registrationEmails;
                console.log(this.registrationEmails)
            }, error: (error) => {
                console.log(error);
            }
        })

        // this.sortOptions = [
        //     {label: 'Price High to Low', value: '!price'},
        //     {label: 'Price Low to High', value: 'price'}
        // ];
    }
    
    onSortChange(event) {
        let value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        }
        else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }
}
