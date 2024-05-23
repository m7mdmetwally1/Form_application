import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  editForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    addPhoto: new FormControl(''),
    fullNameArabic: new FormControl(''),
    passwordConfirm: new FormControl(''),
    nationality: new FormControl(''),
    country: new FormControl(' '),
    dateOfBirth: new FormControl(),
    address: new FormControl(),
    introduceMySelf: new FormControl(),
    kind: new FormControl(),
    city: new FormControl(),
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      addPhoto: [''],
      firstName: ['', [Validators.minLength(6), Validators.maxLength(20)]],
      lastName: ['', [Validators.minLength(6), Validators.maxLength(20)]],
      fullNameEnglish: [''],
      fullNameArabic: [''],
      nationality: [''],
      dateOfBirth: [''],
      kind: [''],
      country: [''],
      city: [''],
      address: [''],
      introduceMySelf: [''],
    });
  }

  onSubmit() {
    console.log(this.editForm.value);
  }
}
