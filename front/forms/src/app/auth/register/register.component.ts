import { Component, ViewChild, inject } from '@angular/core';
import { OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments';

import {
  FormGroup,
  FormControl,
  AbstractControl,
  FormBuilder,
  FormGroupDirective,
  Validators,
  RequiredValidator,
} from '@angular/forms';
import {
  mobileNumberValidator,
  requireCheckboxesToBeCheckedValidator,
} from '../auth.utility';
import Validation from '../auth.utility';

import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  submitted = false;
  countryName = ['egypt', 'america', 'saudi'];
  showAlert: boolean = false;
  emailSent: boolean = false;
  isLoading: boolean = false;
  serverErrorMessage = '';
  apiUrl = environment.apiUrl + 'authGoogle';
  apiUrl2 = environment.apiUrl + 'authFacebook';

  private renderer = inject(Renderer2);
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  signupForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    passwordConfirm: new FormControl(''),
    mobile: new FormControl(''),
    country: new FormControl(''),
    acceptTerms: new FormControl(false),
    checkBoxGroup: new FormGroup({
      emailCheckbox: new FormControl(false),
      mobileCheckbox: new FormControl(false),
    }),
  });

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
        checkBoxGroup: this.formBuilder.group(
          {
            emailCheckbox: [false],
            mobileCheckbox: [false],
          },
          {
            validator: requireCheckboxesToBeCheckedValidator(1),
          }
        ),
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

  get f2(): { [key: string]: AbstractControl } {
    return (this.f['checkBoxGroup'] as FormGroup).controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    this.isLoading = true;

    const emailCheckBoxValue = this.signupForm.get(
      'checkBoxGroup.emailCheckbox'
    )?.value;
    const mobileCheckBoxValue = this.signupForm.get(
      'checkBoxGroup.mobileCheckbox'
    )?.value;

    let formData = this.signupForm.value;
    formData.otpMethod = this.otpMethod(
      emailCheckBoxValue,
      mobileCheckBoxValue
    );
    delete formData.checkBoxGroup;

    let signupResonse = this.authService.register(formData);

    signupResonse.subscribe(
      (formData) => {
        this.isLoading = false;
        const email = formData.data.user.email;

        localStorage.setItem('RegisteredEmail', email);
        this.emailSent = true;

        setTimeout(() => {
          this.emailSent = false;
        }, 3000);

        this.submitted = false;
        this.signupForm.reset();
      },
      (errorMessage) => {
        this.isLoading = false;
        this.serverErrorMessage = errorMessage;
        this.showAlert = true;

        this.submitted = false;
        this.signupForm.reset();
      }
    );
  }

  otpMethod(emailCheckBoxValue: string, mobileCheckBoxValue: string) {
    let otpMethods: string[] = [];
    if (emailCheckBoxValue) {
      otpMethods.push('email');
    }

    if (mobileCheckBoxValue) {
      otpMethods.push('mobile');
    }

    return otpMethods.join(', ');
  }

  googleRegister() {
    window.location.href = `${this.apiUrl}/register`;
  }

  facebookRegister() {
    window.location.href = `${this.apiUrl2}/signup`;
  }

  ngOnDestroy() {
    this.renderer.removeStyle(document.body, 'background-image');
  }
}
