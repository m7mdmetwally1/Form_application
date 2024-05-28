import { Component } from '@angular/core';
import { ProfileService } from '../../service/profile.service';

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.component.html',
  styleUrl: './social-links.component.css',
})
export class SocialLinksComponent {
  constructor(private profileService: ProfileService) {}

  links: any = ['facebook', 'instagram', 'whatsapp', 'twiiter', 'gitup'];

  gettingLink(data: any) {
    console.log('getting link work');
    console.log(data);

    this.profileService.getSocialDetails(data);
  }
}
