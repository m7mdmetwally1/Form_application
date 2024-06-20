import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {
  showAlert: boolean = false;
  serverErrorMessage = '';
  sending: boolean = false;
  emailSent: boolean = false;

  submitted: boolean = false;
  form = {
    email: '',
  };
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.sending = true;

    const email = form.value.email;
    form.reset();

    let forgetPassword = this.authService.forgetPassword(email);

    forgetPassword.subscribe(
      (res) => {
        console.log(res);

        this.emailSent = true;
        this.sending = false;

        setTimeout(() => {
          this.emailSent = false;
        }, 2000);
      },
      (errorMessage) => {
        this.sending = false;
        this.serverErrorMessage = errorMessage;
        this.showAlert = true;
      }
    );

    console.log('in submit');
  }
}
