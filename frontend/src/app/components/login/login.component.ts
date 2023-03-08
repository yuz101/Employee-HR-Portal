import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserAction } from 'src/app/store/actions/user.action';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  constructor(
    private authService: AuthService, 
    private _router: Router, 
    private store: Store
  ) { }
  
  form = new FormBuilder().group({
    username: '',
    email: '',
    password: '',
  });

  login() {
    const {username, email, password} = { ...this.form.getRawValue() };
    this.authService.login(username, email, password).subscribe({
      next: (user: User) => {
        this.store.dispatch(UserAction.setCurrentUser({ user }));
        this._router.navigateByUrl('/');
      }, error: (error) => {
        console.log(error);
      }
    })
  }
}
