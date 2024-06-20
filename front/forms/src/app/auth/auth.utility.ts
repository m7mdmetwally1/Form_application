import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';
import { FormGroup } from '@angular/forms';

export function mobileNumberValidator(
  control: AbstractControl
): ValidationErrors | null {
  const mobileNumberPattern = /^[0-9]{10,15}$/;
  const valid = mobileNumberPattern.test(control.value);
  return valid ? null : { invalidMobileNumber: true };
}

export default class Validation {
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }
}

export function requireCheckboxesToBeCheckedValidator(minRequired = 1): any {
  return function validate(formGroup: FormGroup) {
    let checked = 0;

    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.controls[key];

      if (control.value === true) {
        checked++;
      }
    });

    if (checked < minRequired) {
      return {
        requireCheckboxesToBeCheckedValidator: true,
      };
    }

    return null;
  };
}
