import { Component, EventEmitter, Output } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  private apiUrl = 'http://localhost:3000/api/v1/authGoogle';
  private apiUrl2 = 'http://localhost:3000/api/v1/authFacebook';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submitted = false;
  showAlert: boolean = false;
  isLoading: boolean = false;
  serverErrorMessage: string = '';

  constructor(
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const token = this.route.snapshot.queryParams['token'];
    if (token) {
      localStorage.setItem('userData', token);
      this.router.navigate(['authen/profile']);
    }

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    // this.renderer.setStyle(
    //   document.body,
    //   'backgroundImage',
    //   'url("../../../assets/images4.png")'
    // );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

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
        this.serverErrorMessage = errorMessage;
        this.showAlert = true;
        this.submitted = false;
        this.loginForm.reset();
      }
    );
  }

  googleLogin() {
    window.location.href = `${this.apiUrl}/register`;
  }

  facebookLogin() {
    window.location.href = `${this.apiUrl2}/login`;
  }

  ngOnDestroy() {
    this.renderer.removeStyle(document.body, 'background-image');
  }
}
