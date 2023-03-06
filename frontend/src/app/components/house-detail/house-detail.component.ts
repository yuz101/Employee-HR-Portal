import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseService } from '../../services/house.service';
import { House } from '../../house.module';

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.css'],
})
export class HouseDetailComponent implements OnInit {
  house!: House;

  constructor(
    private route: ActivatedRoute,
    private houseService: HouseService,
    private router: Router,
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

  deleteHouse() {
    if (confirm('Are you sure you want to delete this house?')) {
      const id = this.route.snapshot.paramMap.get('id');
      this.houseService.deleteHouse(id!).subscribe(
        (res) => {
          this.router.navigate(['/houses']);
        },
        (err) => console.error(err)
      );
    }
  }
}
