import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { updateFormDate } from '../shared/updateForm';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  errorMessage: string = '';

  private _HttpClient = inject(HttpClient);

  linkName = new BehaviorSubject('');

  profileData: Partial<updateFormDate> = {};

  socialMediaLinks: { [key: string]: string } = {};

  recieveEditData(data: updateFormDate) {
    this.profileData = data;
  }

  getSocialDetails(data: string) {
    this.linkName.next(data);
  }

  addLinks(link: string, link_: string) {
    this.socialMediaLinks[link] = link_;
  }

  handleUpdateProfileData() {
    this.profileData.socialMediaLinks = this.socialMediaLinks;

    return this.sendDate(this.profileData);
  }

  sendDate(data: Partial<updateFormDate>) {
    this.profileData = {};
    return this._HttpClient
      .patch('http://localhost:3000/api/v1/profiles/authen', data)
      .pipe(
        catchError(this.handleError),
        tap((data) => {
          console.log('Data returned:', data);
        })
      );
  }

  private handleError = (error: HttpErrorResponse) => {
    console.log('handle error is working');

    console.log(error.error.message[0].message);
    this.errorMessage = error.error.message[0].message;
    console.log(this.errorMessage);

    return throwError(this.errorMessage);
  };
}
