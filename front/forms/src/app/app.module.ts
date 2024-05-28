import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { AuthInterceptorService } from './service/auth-interceptors.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProfileModule,
    HttpClientModule,
    AuthModule,
    FormsModule,
  ],
  providers: [provideHttpClient(withInterceptors([AuthInterceptorService]))],
  bootstrap: [AppComponent],
})
export class AppModule {}
