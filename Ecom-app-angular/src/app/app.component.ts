import {Component, OnInit} from '@angular/core';
import {KeycloakService} from 'keycloak-angular';
import {KeycloakProfile} from 'keycloak-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'ecom-app-angular';
  public profile! : KeycloakProfile;

  constructor(public keycloakService: KeycloakService) {}

  // Initialize the component and check authentication status
  async ngOnInit() {
    if (this.keycloakService.isLoggedIn()) {
      this.keycloakService.loadUserProfile().then(profile=>{
        this.profile = profile;
      });
    }
  }

  // Handle login action
  async handleLogin() {
    await this.keycloakService.login({
      redirectUri: window.location.origin // Redirect to current origin after login
    });
  }

  // Handle logout action
  handleLogout() {
    this.keycloakService.logout(window.location.origin); // Logout from Keycloak
  }
}
