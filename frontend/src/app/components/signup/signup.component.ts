import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'
import { Store } from '@ngrx/store';
import { UserAction } from 'src/app/store/actions/user.action';
import { User } from '../../models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  constructor(
    private authService: AuthService, 
    private _router: Router, 
    private route: ActivatedRoute,
    private store: Store
  ) { }
  email: string;
  token: string;
  
  form = new FormBuilder().group({
    username: '',
    password: '',
  });

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.email = params["email"];
        this.token = params["token"];
      }
    );
  }

  signup() {
    const {username, password} = { ...this.form.getRawValue() };
    this.authService.signup(username, this.email, password).subscribe({
      next: (user: User) => {
        this.authService.storeJwtToken(user.jwt);
        this.store.dispatch(UserAction.setCurrentUser({ user }));
        this._router.navigateByUrl('/');
      }, error: (error) => {
        console.log(error);
      }
    })
  }
}
