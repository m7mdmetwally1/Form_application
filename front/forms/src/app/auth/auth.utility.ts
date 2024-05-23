import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';
import { FormGroup } from '@angular/forms';

export function mobileNumberValidator(
  control: AbstractControl
): ValidationErrors | null {
  const mobileNumberPattern = /^[0-9]{10,15}$/; // Adjust pattern based on requirements
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

// export function atLeastOneCheckboxCheckedValidator(
//   checkbox1Key: string,
//   checkbox2Key: string
// ): ValidatorFn {
//   return (formGroup: AbstractControl): ValidationErrors | null => {
//     const checkbox1 = formGroup.get(checkbox1Key)?.value;
//     const checkbox2 = formGroup.get(checkbox2Key)?.value;

//     if (checkbox1 || checkbox2) {
//       return null; // valid
//     } else {
//       return { atLeastOneRequired: true }; // invalid
//     }
//   };
// }
