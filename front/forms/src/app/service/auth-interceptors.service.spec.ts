import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Adjust the path as needed
import { switchMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorsService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.userToken.pipe(
      take(1),
      switchMap((token) => {
        const authToken = token ? `Bearer ${token}` : '';

        const urlWithToken = token ? `${req.url}?authToken=${token}` : req.url;

        const authReq = req.clone({
          url: urlWithToken,
          setHeaders: {
            Authorization: authToken,
          },
        });

        return next.handle(authReq);
      })
    );
  }
}
