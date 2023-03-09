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
import { AuthService } from './auth.service';
import { catchError, filter, take, switchMap } from 'rxjs/operators';

@Injectable()
// Must implement the HttpInterceptor Interface!
export class InterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private store: Store) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
      if (this.authService.getJwtToken()) {
        request = this.addToken(request, this.authService.getJwtToken()!);
      }

      return next.handle(request)
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
        setHeaders: {
          'authorization': `Bearer ${token}`
        }
      });
    }
  }