import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SocialLinksComponent } from './social-links/social-links.component';
import { ProfileComponent } from './profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LinkDetailsComponent } from './social-links/link-details/link-details.component';

@NgModule({
  declarations: [
    EditProfileComponent,
    SocialLinksComponent,
    ProfileComponent,
    LinkDetailsComponent,
  ],
  imports: [
    ProfileRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  exports: [
    EditProfileComponent,
    SocialLinksComponent,
    ProfileComponent,
    LinkDetailsComponent,
  ],
})
export class ProfileModule {}
