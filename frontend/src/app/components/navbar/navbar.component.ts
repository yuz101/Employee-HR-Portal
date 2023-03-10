import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isHR: boolean;
  constructor(private authService: AuthService) {}
  ngOnInit() {
      this.isHR = this.authService.getIsHR();
  }
}
