import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  handleFormSubmission(formValue: any) {
    console.log('in formsubmiison method');
    console.log('Form submitted from child component:', formValue);
  }
}
