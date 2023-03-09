import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './services/auth.service';
import { selectUser } from './store/selectors/user.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  isHR: boolean;
  constructor(private authService: AuthService) {}
  ngOnInit() {
      this.isHR = this.authService.getIsHR();
  }
}
