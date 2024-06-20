import { Component, inject } from '@angular/core';
import { ProfileService } from '../../service/profile.service';

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.css',
})
export class SocialLinksComponent {
  private profileService = inject(ProfileService);

  links: any = ['facebook', 'instagram', 'whatsapp', 'twiiter', 'gitup'];

  gettingLink(data: any) {
    this.profileService.getSocialDetails(data);
  }
}
