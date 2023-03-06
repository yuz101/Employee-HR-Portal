import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HouseService } from '../../services/house.service';

@Component({
  selector: 'app-house-add',
  templateUrl: './house-add.component.html',
  styleUrls: ['./house-add.component.css'],
})
export class HouseAddComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private houseService: HouseService
  ) {
    this.form = this.fb.group({
      address: this.fb.group({
        streetName: ['', Validators.required],
        buildingNumber: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required],
      }),
      landlord: this.fb.group({
        fullName: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
      }),
      facility: this.fb.group({
        beds: [0, Validators.required],
        mattresses: [0, Validators.required],
        tables: [0, Validators.required],
        chairs: [0, Validators.required],
      }),
    });
  }

  onSubmit(): void {
    const house = this.form.value;
    this.houseService.addHouse(house).subscribe(() => {
      this.router.navigate(['/houses']);
    });
  }
}
