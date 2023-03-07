import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from 'src/app/models/employee';


@Component({
  selector: 'app-employee-profiles',
  templateUrl: './employee-profiles.component.html',
  styleUrls: ['./employee-profiles.component.css']
})
export class EmployeeProfilesComponent implements OnInit {
  loading$: Observable<boolean>;
  error$: Observable<string>;
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchTerm: string = '';

  constructor(private apiService: EmployeeService) {}

  ngOnInit() {
    this.apiService.getAllProfiles().subscribe(
      (data: any) => {
        console.log(data.employees);
        this.employees = data.employees.map((employee: any) => {
          return {
            _id: employee._id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            phoneNumber: employee.phoneNumber,
            address: employee.address,
            showDetails: false
          }
        });
        this.employees = this.sortEmployees(this.employees);
      }
    );
  }

  sortEmployees(employees: Employee[]): Employee[] {
    return employees.sort((a, b) => {
      if (a.lastName < b.lastName) {
        return -1;
      }
      if (a.lastName > b.lastName) {
        return 1;
      }
      return 0;
    });
  }

  toggleDetailView(employee: Employee) {
    employee.showDetails = !employee.showDetails;
    const profileUrl = `/employees/${employee._id}`;
    const newWindow = window.open(profileUrl, '_blank');
    if (newWindow) {
      newWindow.document.write(`
      <html>
        <head>
          <title>Employee Profile: ${employee.firstName ?? ''} ${employee.lastName ?? ''}</title>
        </head>
        <body>
          <div *ngIf="employee.showDetails">
            <hr>
            <h3>${employee.firstName ?? ''} ${employee.lastName ?? ''}</h3>
            <p>Prefered Name: ${employee.preferredName ?? ''}</p>
            <p>SSN: ${employee.ssn ?? ''}</p>
            <p>Work Authorization Title: ${employee.workAuthorizationTitle ?? ''}</p>
            <p>Email: ${employee.email ?? ''}</p>
            <p>Phone: ${employee.phoneNumber ?? ''}</p>
          </div>
        </body>
      </html>
    `);
    }
  }

  
  search(): void {
    if (this.searchTerm) {
      this.filteredEmployees = this.employees.filter((employee) => {
        const fullName = `${employee.firstName} ${employee.lastName}`;
        return fullName.toLowerCase().includes(this.searchTerm.toLowerCase());
      });
      this.filteredEmployees = this.sortEmployees(this.filteredEmployees);
    } else {
      this.filteredEmployees = this.sortEmployees(this.employees);
    }
  }
}
