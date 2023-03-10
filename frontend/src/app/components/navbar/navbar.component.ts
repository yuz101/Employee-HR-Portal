import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isHR: boolean;
  dropdownMenu = true;
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
      this.isHR = this.authService.getIsHR();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['auth/login']);
  }
}
