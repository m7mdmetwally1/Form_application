import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, tap, throwError, BehaviorSubject } from 'rxjs';
import { FormData } from '../shared/formData';
import { Form } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private errorMessage: string = '';
  userToken = new BehaviorSubject<string>('');
  private _HttpClient = inject(HttpClient);
  private router = inject(Router);

  register(formData: FormData): Observable<any> {
    return this._HttpClient
      .post('http://localhost:3000/api/v1/users/signup', formData)
      .pipe(
        catchError(this.handleError),
        tap((data) => {
          console.log('Data returned:', data);
        })
      );
  }

  checkOtp(otpNumber: string, email: string) {
    console.log(email);
    return this._HttpClient
      .post('http://localhost:3000/api/v1/users/checkOtp', {
        email: email,
        otpNumber: otpNumber,
      })
      .pipe(catchError(this.handleError));
  }

  resendOtp(email: string) {
    return this._HttpClient
      .post('http://localhost:3000/api/v1/users/resendOtp', { email: email })
      .pipe(
        catchError(this.handleError),
        tap((data) => {
          console.log('success');
        })
      );
  }

  logout() {
    localStorage.removeItem('userData');
    this.router.navigate(['./auth/login']);
  }

  login(email: string, password: string) {
    return this._HttpClient
      .post<any>('http://localhost:3000/api/v1/users/login', {
        email: email,
        password: password,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(resData);
        })
      );
  }

  newPassword(password: string, token: string) {
    return this._HttpClient
      .post<any>('http://localhost:3000/api/v1/users/resetPassword', {
        password: password,
        token: token,
      })
      .pipe(
        tap((returnedData) => {}),
        catchError(this.handleError)
      );
  }

  forgetPassword(email: string) {
    return this._HttpClient
      .post<any>('http://localhost:3000/api/v1/users/forgetPassword', {
        email: email,
      })
      .pipe(
        tap((returnedData) => {
          localStorage.setItem('resetToken', returnedData.resetToken);
        }),
        catchError(this.handleError)
      );
  }

  private handleAuthentication(resData: any) {
    localStorage.setItem('userData', resData.token);
  }

  private handleError = (error: HttpErrorResponse) => {
    this.errorMessage = error.error.message;

    return throwError(this.errorMessage);
  };
}
