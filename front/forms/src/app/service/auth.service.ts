import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError, BehaviorSubject } from 'rxjs';
import { FormData } from '../shared/formData';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public errorMessage: string = '';
  public otpMethod: string = '';
  public email: string = '';
  public authenticated: boolean = false;

  userToken = new BehaviorSubject<any>(null);

  constructor(private _HttpClient: HttpClient) {}

  register(formData: FormData): Observable<any> {
    console.log(formData);
    console.log(formData.otpMethod);
    console.log('i reached register');
    console.log(this.email);
    return this._HttpClient
      .post('http://localhost:3000/api/v1/users/signup', formData)
      .pipe(
        catchError(this.handleError),
        tap((data) => {
          console.log('Data returned:', data);
        })
      );
  }

  checkOtp(otpNumber: any) {
    return this._HttpClient.post(
      'http://localhost:3000/api/v1/users/checkOtp',
      {
        email: this.email,
        otpNumber: otpNumber,
      }
    );
  }

  isAuthenticated(): boolean {
    return !!this.userToken.getValue();
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

  private handleAuthentication(resData: any) {
    // const expirationData = new Date(new Date().getTime() + +expiresIn * 1000);
    // const user = new User(email, userId, token, expirationData);
    // this.user.next(user);
    // this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(resData.token));
    this.userToken.next(resData.token);
  }

  private handleError = (error: HttpErrorResponse) => {
    console.log('handle error is working');

    console.log(error.error.message[0].message);
    this.errorMessage = error.error.message[0].message;
    console.log(this.errorMessage);

    return throwError(this.errorMessage);
  };
}
