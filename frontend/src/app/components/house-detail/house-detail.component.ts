// import { Component, OnInit, Input } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import { HouseService } from '../../services/house.service';
// import { House } from '../../house.module';

// @Component({
//   selector: 'app-house-detail',
//   templateUrl: './house-detail.component.html',
//   styleUrls: ['./house-detail.component.css']
// })
// export class HouseDetailComponent implements OnInit {
//   houseId = '';
//   houseForm!: FormGroup;
//   house!: House;

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private fb: FormBuilder,
//     private houseService: HouseService
//   ) { }

//   ngOnInit(): void {
//     const id = this.route.snapshot.paramMap.get('id');
//     if (id) {
//       this.houseId = id; // Update the houseId variable
//       this.houseService.getHouse(id).subscribe(house => {
//         this.house = house;
//         this.houseId = id;
//         this.houseForm.setValue({
//           address: {
//             streetName: this.house?.address?.streetName || '',
//             buildingNumber: this.house?.address?.buildingNumber || '',
//             city: this.house?.address?.city || '',
//             state: this.house?.address?.state || '',
//             zip: this.house?.address?.zip || ''
//           },
//           landlord: {
//             fullName: this.house?.landlord?.fullName || '',
//             phoneNumber: this.house?.landlord?.phoneNumber || '',
//             email: this.house?.landlord?.email || ''
//           },
//           facility: {
//             beds: this.house?.facility?.beds || '',
//             mattresses: this.house?.facility?.mattresses || '',
//             tables: this.house?.facility?.tables || '',
//             chairs: this.house?.facility?.chairs || ''
//           },
//           residents: this.house?.residents || '',
//           roommates: this.house?.roommates || '',
//           reports: this.house?.reports || ''
//         });
//       });
//     }

//     this.houseForm = this.fb.group({
//       address: this.fb.group({
//         streetName: ['', Validators.required],
//         buildingNumber: ['', Validators.required],
//         city: ['', Validators.required],
//         state: ['', Validators.required],
//         zip: ['', Validators.required]
//       }),
//       landlord: this.fb.group({
//         fullName: ['', Validators.required],
//         phoneNumber: ['', Validators.required],
//         email: ['', Validators.required]
//       }),
//       facility: this.fb.group({
//         beds: ['', Validators.required],
//         mattresses: ['', Validators.required],
//         tables: ['', Validators.required],
//         chairs: ['', Validators.required]
//       }),
//       residents: [''],
//       roommates: [''],
//       reports: ['']
//     });

//     console.log('Getting house with ID:', this.houseId);

//     this.houseService.getHouse(this.houseId).subscribe(house => {
//       console.log('ts: get house: ', house);
//       console.log('ts: get house streetName: ', house.address.streetName);
//       this.house = house;

//       this.houseForm.setValue({
//         address: {
//           streetName: this.house?.address?.streetName || '',
//           buildingNumber: this.house?.address?.buildingNumber || '',
//           city: this.house?.address?.city || '',
//           state: this.house?.address?.state || '',
//           zip: this.house?.address?.zip || ''
//         },
//         landlord: {
//           fullName: this.house?.landlord?.fullName || '',
//           phoneNumber: this.house?.landlord?.phoneNumber || '',
//           email: this.house?.landlord?.email || ''
//         },
//         facility: {
//           beds: this.house?.facility?.beds || '',
//           mattresses: this.house?.facility?.mattresses || '',
//           tables: this.house?.facility?.tables || '',
//           chairs: this.house?.facility?.chairs || ''
//         },
//         residents: this.house?.residents || '',
//         roommates: this.house?.roommates || '',
//         reports: this.house?.reports || ''
//       });
//     });

//   }

//   deleteHouse(): void {
//     if (confirm('Are you sure you want to delete this house?')) {
//       this.houseService.deleteHouse(this.houseId).subscribe(() => {
//         this.router.navigate(['/houses']);
//       });
//     }
//   }

//   onSubmit(): void {
//     const updatedHouse = this.houseForm.value;
//     if (this.house) {
//       updatedHouse._id = this.house._id;
//       this.houseService.updateHouse(updatedHouse).subscribe(() => {
//         this.router.navigate(['/houses']);
//       });
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HouseService } from '../../services/house.service';
import { House } from '../../house.module';
@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.css'],
})
// export class HouseDetailComponent implements OnInit {
//   house!: House;

//   constructor(
//     private route: ActivatedRoute,
//     private houseService: HouseService
//   ) { }

//   ngOnInit(): void {
//     const id = this.route.snapshot.paramMap.get('id');
//     this.houseService.getHouse(id!).subscribe((house: House) => {
//       this.house = house;
//     });
//   }

// }
export class HouseDetailComponent implements OnInit {
  house!: House;

  constructor(
    private route: ActivatedRoute,
    private houseService: HouseService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.houseService.getHouseDetails(id!).subscribe(
      (res) => {
        this.house = res.house;
      },
      (err) => console.error(err)
    );
  }
}
