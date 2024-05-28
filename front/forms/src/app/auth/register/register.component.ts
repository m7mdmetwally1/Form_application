import { Component } from '@angular/core';
import { OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormControl,
  AbstractControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { mobileNumberValidator } from '../auth.utility';
import Validation from '../auth.utility';

import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  signupForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    passwordConfirm: new FormControl(''),
    mobile: new FormControl(''),
    country: new FormControl(' '),
    acceptTerms: new FormControl(false),
    emailCheckbox: new FormControl(false),
    mobileCheckbox: new FormControl(false),
  });
  submitted = false;
  private apiUrl = 'http://localhost:3000/api/v1/authGoogle';

  countryName = ['egypt', 'america', 'saudi'];

  constructor(
    private renderer: Renderer2,
    private formBuilder: FormBuilder,
    private authService: AuthService,

    private router: Router,
    private route: ActivatedRoute
  ) {}

  showAlert: boolean = false;
  serverErrorMessage = '';

  selectCountry(event: Event, country: string) {
    event.preventDefault();

    this.signupForm.get('country')?.setValue(country);
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group(
      {
        firstName: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(40),
          ],
        ],
        country: ['', Validators.required],
        passwordConfirm: ['', Validators.required],
        mobile: ['', [Validators.required, mobileNumberValidator]],
        acceptTerms: [false, Validators.requiredTrue],
        emailCheckbox: [false, Validators.requiredTrue],
        mobileCheckbox: [false, Validators.requiredTrue],
      },
      {
        validators: [Validation.match('password', 'passwordConfirm')],
      }
    );

    this.renderer.setStyle(
      document.body,
      'backgroundImage',
      'url("../../../assets/images4.png")'
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }

  onSubmit(): void {
    console.log(this.signupForm.value);
    this.submitted = true;
    console.log('in submit');

    console.log(this.signupForm.value);
    const emailCheckBoxValue = this.signupForm.get('emailCheckbox')?.value;
    const mobileCheckBoxValue = this.signupForm.get('mobileCheckbox')?.value;

    const otp = emailCheckBoxValue === mobileCheckBoxValue;

    if (this.signupForm.invalid && otp && !emailCheckBoxValue) {
      console.log('invalid');
      return;
    }
    console.log(this.signupForm.value);
    let formData = this.signupForm.value;
    console.log(formData);

    formData.otpMethod = '';

    if (formData.emailCheckbox) {
      formData.otpMethod += 'email';
    }

    if (formData.mobileCheckbox) {
      console.log('there is no mobile');
      if (formData.otpMethod) {
        formData.otpMethod += ', ';
      }
      formData.otpMethod += 'mobile';
    }

    delete formData.emailCheckbox;
    delete formData.mobileCheckbox;

    let signupResonse = this.authService.register(formData);

    signupResonse.subscribe(
      (formData) => {
        // this.signupForm.reset();
        console.log(formData);
        this.authService.email = formData.data.user.email;
        console.log(formData.data.user.email);

        this.router.navigate(['/otpCheck']);
      },
      (errorMessage) => {
        this.serverErrorMessage = errorMessage;
        this.showAlert = true;
        this.signupForm.get('firstName')?.setValue('');
        this.signupForm.get('lastName')?.setValue('');

        // Mark them as touched and dirty
        this.signupForm.get('firstName')?.markAsTouched();
        this.signupForm.get('firstName')?.markAsDirty();
        this.signupForm.get('lastName')?.markAsTouched();
        this.signupForm.get('lastName')?.markAsDirty();
      }
    );
  }

  googleRegister() {
    window.location.href = `${this.apiUrl}/register`;
  }

  ngOnDestroy() {
    this.renderer.removeStyle(document.body, 'background-image');
  }
}
