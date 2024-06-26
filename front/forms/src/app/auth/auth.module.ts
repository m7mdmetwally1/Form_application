import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OtpCheckComponent } from './otp-check/otp-check.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    OtpCheckComponent,
    ForgetPasswordComponent,
    NewPasswordComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, FormsModule],
  exports: [
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    OtpCheckComponent,
  ],
})
export class AuthModule {}
