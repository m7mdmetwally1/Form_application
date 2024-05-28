import { Component, EventEmitter, Output } from '@angular/core';
import { Renderer2 } from '@angular/core';
import {
  FormGroup,
  FormControl,
  AbstractControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @Output() public click = new EventEmitter<any>();

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submitted = false;

  constructor(
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.renderer.setStyle(
      document.body,
      'backgroundImage',
      'url("../../../assets/images4.png")'
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.click.emit('mohamed');
    console.log('mohamed');
    this.submitted = true;

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    let loginResonse = this.authService.login(email, password);

    loginResonse.subscribe(
      (formData) => {
        // this.signupForm.reset();
        console.log(formData.token);
        console.log('success');
        console.log('in login response');
        this.authService.userToken.next(formData.token);
        this.router.navigate(['authen/profile']);
      },
      (errorMessage) => {
        console.log('fail');
      }
    );
  }

  ngOnDestroy() {
    this.renderer.removeStyle(document.body, 'background-image');
  }
}
