import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ProfileService } from '../../service/profile.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  submitted = false;
  imageUrl: string | ArrayBuffer | null = null;

  editForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
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

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private http: HttpClient
  ) {}

  get f(): { [key: string]: AbstractControl } {
    return this.editForm.controls;
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      // Preview the image before upload
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append('file', file);

      this.http
        .post('http://localhost:3000/api/v1/profiles/upload', formData)
        .subscribe(
          (response) => {
            console.log('File uploaded successfully', response);
          },
          (error) => {
            console.error('Error uploading file', error);
          }
        );
    }
  }

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      firstName: ['', [Validators.minLength(6), Validators.maxLength(20)]],
      lastName: ['', [Validators.minLength(6), Validators.maxLength(20)]],
      fullNameEnglish: [''],
      fullNameArabic: ['', Validators.required],
      nationality: [''],
      dateOfBirth: [''],
      kind: [''],
      country: [''],
      city: [''],
      address: ['', Validators.required],
      introduceMySelf: [''],
    });
  }

  onSubmit() {
    this.submitted = true;
    console.log('in submit method in profile');

    this.profileService.recieveEditData(this.editForm.value);
    const data = this.profileService.handleUpdateProfileData();

    this.submitted = false;
    this.editForm.reset();

    data.subscribe(
      (returned) => {
        console.log(returned);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
