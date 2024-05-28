import { Component } from '@angular/core';
import { ProfileService } from '../../../service/profile.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-link-details',
  templateUrl: './link-details.component.html',
  styleUrl: './link-details.component.css',
})
export class LinkDetailsComponent {
  link: string = '';

  formGroup: FormGroup = new FormGroup({
    link: new FormControl(''),
  });

  constructor(
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      link: ['', [Validators.pattern('https?://.+')]],
    });

    this.profileService.linkName.subscribe((data: string) => {
      this.link = data;
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  addLink() {
    console.log(this.formGroup.value);

    console.log(this.formGroup.get('link')?.value);

    const link_ = this.formGroup.get('link')?.value;

    this.profileService.addLinks(this.link, link_);
    // this.profileService.handleUpdateProfileData();

    this.formGroup.reset();
    this.router.navigate(['social']);
  }
}
