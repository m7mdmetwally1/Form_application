import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { updateFormDate } from '../shared/updateForm';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  errorMessage: string = '';
  constructor(private _HttpClient: HttpClient) {}

  linkName = new BehaviorSubject('');

  socialMediaLinks: { [key: string]: any } = {};

  profileData: { [key: string]: any } = {};

  recieveEditData(data: any) {
    console.log(this.profileData);
    this.profileData['firstName'] = data.firstName;
    this.profileData['lastName'] = data.lastName;
    this.profileData['nationality'] = data.nationality;
    this.profileData['kind'] = data.kind;
    this.profileData['country'] = data.country;
    this.profileData['city'] = data.city;
    this.profileData['address'] = data.address;
    this.profileData['introduceMySelf'] = data.introduceMySelf;
    this.profileData['dateOfBirth'] = data.dateOfBirth;
    this.profileData['fullNameArabic'] = data.fullNameArabic;
    this.profileData['fullNameEnglish'] = data.fullNameEnglish;
  }

  getSocialDetails(data: string) {
    this.linkName.next(data);
  }

  addLinks(link: string, link_: string) {
    this.socialMediaLinks[link] = link_;
    this.profileData['socialMediaLinks'] = this.socialMediaLinks;
  }

  handleUpdateProfileData() {
    console.log(this.profileData);

    // const requestData: updateFormDate = {
    //   firstName: this.profileData['firstName'],
    //   lastName: this.profileData['lastName'],
    //   nationality: this.profileData['nationality'],
    //   kind: this.profileData['kind'],
    //   country: this.profileData['country'],
    //   city: this.profileData['city'],
    //   address: this.profileData['address'],
    //   introduceMySelf: this.profileData['introduceMySelf'],
    //   dateOfBirth: this.profileData['dateOfBirth'],
    //   fullNameArabic: this.profileData['fullNameArabic'],
    //   fullNameEnglish: this.profileData['fullNameEnglish'],
    //   socialMediaLinks: this.profileData['socialMediaLinks'],
    // };

    // console.log(requestData);
    // console.log('check');
    // console.log();

    const returnedData = this.sendDate(this.profileData);
    return returnedData;
  }

  sendDate(data: any) {
    console.log('in send data');
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
