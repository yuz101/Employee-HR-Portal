import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HouseService } from '../../services/house.service';
import { House } from '../../models/house';

@Component({
  selector: 'app-employee-house-detail',
  templateUrl: './employee-house-detail.component.html',
  styleUrls: ['./employee-house-detail.component.css'],
})
export class EmployeeHouseDetailComponent implements OnInit {
  house!: House;

  constructor(
    private route: ActivatedRoute,
    private houseService: HouseService,
  ) {}

  ngOnInit() {
    const employeeId = "6406b7d8d0dd20a9c3902ff4";
    if (employeeId) {
      this.houseService.getHouseByEmployeeId(employeeId).subscribe(
        (res) => {
          // console.log("Response: ", res[0]);
          this.house = res[0];
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }
}
