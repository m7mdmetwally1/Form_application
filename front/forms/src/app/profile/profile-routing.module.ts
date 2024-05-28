import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SocialLinksComponent } from './social-links/social-links.component';
import { LinkDetailsComponent } from './social-links/link-details/link-details.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      { path: 'edit', component: EditProfileComponent },
      {
        path: 'social',
        component: SocialLinksComponent,
        children: [{ path: ':id', component: LinkDetailsComponent }],
      },
      { path: '', redirectTo: 'edit', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
