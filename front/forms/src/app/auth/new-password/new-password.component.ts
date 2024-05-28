import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css',
})
export class NewPasswordComponent {
  showAlert: boolean = false;
  serverErrorMessage = '';

  submitted: boolean = false;
  form = {
    password: '',
  };
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log(form);
    const password = form.value.password;

    console.log(password);
    let newPassword = this.authService.newPassword(password);

    newPassword.subscribe(
      () => {
        console.log('success');
        this.router.navigate(['/authen/profile']);
      },
      () => {
        console.log('fail');
      }
    );

    console.log('in submit');
  }
}
