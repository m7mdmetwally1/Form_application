import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css',
})
export class NewPasswordComponent {
  showAlert: boolean = false;
  serverErrorMessage = '';
  newPass: boolean = false;

  submitted: boolean = false;
  form = {
    password: '',
  };
  constructor(private authService: AuthService, private router: Router) {}

  private activateRoute = inject(ActivatedRoute);

  token = this.activateRoute.snapshot.params['id'];

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const password = form.value.password;

    let newPassword = this.authService.newPassword(password, this.token);

    newPassword.subscribe(
      () => {
        localStorage.removeItem('resetToken');
        this.newPass = true;
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 2000);
      },
      (errorMessage) => {
        this.serverErrorMessage = errorMessage;
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 2000);
      }
    );
  }
}
