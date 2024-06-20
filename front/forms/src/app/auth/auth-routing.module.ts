import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OtpCheckComponent } from './otp-check/otp-check.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { authGuard } from '../service/auth.guard';
import { otpGuard } from '../service/otp.guard';
import { resetGuard } from '../service/reset.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      {
        path: 'otpCheck',
        component: OtpCheckComponent,
        canActivate: [otpGuard],
      },
      { path: 'forgetPassword', component: ForgetPasswordComponent },
      {
        path: 'resetPassword/:id',
        component: NewPasswordComponent,
        canActivate: [resetGuard],
      },

      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
