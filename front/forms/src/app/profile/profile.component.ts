import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  ngOnInit() {}
  private authService = inject(AuthService);

  ngOninit() {}

  logout() {
    this.authService.logout();
  }
}
