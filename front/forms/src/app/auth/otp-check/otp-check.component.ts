import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp-check',
  templateUrl: './otp-check.component.html',
  styleUrl: './otp-check.component.css',
})
export class OtpCheckComponent {
  constructor(private authService: AuthService, private router: Router) {}
  showAlert: boolean = false;
  serverErrorMessage = '';

  submitted: boolean = false;
  form = {
    otpNumber: '',
  };

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(form);
    const otpValue = form.value.otpNumber;

    console.log(otpValue);
    let checkOtpResponse = this.authService.checkOtp(otpValue);

    checkOtpResponse.subscribe(
      (res) => {
        console.log('success');

        console.log(res);

        if()

        // if (res.otpCode) {
        //   this.router.navigate(['/newOassword']);
        // }

        this.router.navigate(['/login']);
      },
      () => {
        console.log('fail');
      }
    );

    console.log('in submit');
  }
}
