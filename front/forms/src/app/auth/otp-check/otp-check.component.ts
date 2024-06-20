import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp-check',
  templateUrl: './otp-check.component.html',
  styleUrl: './otp-check.component.css',
})
export class OtpCheckComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  showAlert: boolean = false;
  serverErrorMessage = '';
  verified: boolean = false;
  submitted: boolean = false;
  resended: boolean = false;
  isLoading: boolean = false;

  form = {
    otpNumber1: '',
    otpNumber2: '',
    otpNumber3: '',
    otpNumber4: '',
  };

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const otpValue = `${form.value.otpNumber1}${form.value.otpNumber2}${form.value.otpNumber3}${form.value.otpNumber4}`;

    const registeredEmail = localStorage.getItem('RegisteredEmail');

    if (!registeredEmail) {
      return;
    }

    let checkOtpResponse = this.authService.checkOtp(otpValue, registeredEmail);

    checkOtpResponse.subscribe(
      (res) => {
        this.verified = true;
        form.reset();

        setTimeout(() => {
          this.router.navigate(['/login']);
          localStorage.removeItem('RegisteredEmail');
        }, 2000);
      },
      (errorMessage) => {
        this.serverErrorMessage = errorMessage;
        this.showAlert = true;
        form.reset();
        setTimeout(() => {
          this.showAlert = false;
        }, 2000);
      }
    );
  }

  resendOtp() {
    this.isLoading = true;
    const email = localStorage.getItem('RegisteredEmail');
    console.log(email);
    if (!email) {
      this.serverErrorMessage = 'try register again';
      this.showAlert = true;
      return;
    }
    const resendOk = this.authService.resendOtp(email);

    resendOk.subscribe(
      () => {
        this.isLoading = false;
        this.resended = true;

        setTimeout(() => {
          this.resended = false;
        }, 3000);
      },
      (error) => {
        this.isLoading = false;
        this.serverErrorMessage = 'try register again';
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 3000);
      }
    );
  }
}
