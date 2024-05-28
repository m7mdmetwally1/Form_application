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

  submitted: boolean = false;
  form = {
    email: '',
  };
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(form);
    const email = form.value.email;

    console.log(email);
    let forgetPassword = this.authService.forgetPassword(email);

    forgetPassword.subscribe(
      (res) => {
        console.log(res);

        console.log('success');
        this.router.navigate(['/otpCheck']);
      },
      () => {
        console.log('fail');
      }
    );

    console.log('in submit');
  }
}
