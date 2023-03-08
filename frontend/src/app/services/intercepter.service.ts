import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { selectUser } from '../store/selectors/user.selector';

@Injectable()
// Must implement the HttpInterceptor Interface!
export class InterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Some logic to grab the token
    // jwt: string;
    // const user$: Observable<User> = this.store.select(selectUser);
    // const jwt = user$.subscribe((user: User) => {
    //   return user.jwt
    // });
    
    // HttpHandler to clone our Request Object and append a token to the header
    console.log('InterceptorService: ', this.jwt);
    return next.handle(req.clone({ setHeaders: { authorization: `Bearer ${this.jwt}` } }));
  }

  jwt: string;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.select(selectUser).subscribe((user: User) => {
      this.jwt = user.jwt;
    });
    console.log('oninit', this.jwt)
  }
}
