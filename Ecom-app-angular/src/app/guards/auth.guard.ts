import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'  // Ensure the guard is provided in the root module
})
export class AuthGuard implements CanActivate {
  constructor(
    private keycloakService: KeycloakService,  // Inject KeycloakService here
    private router: Router
  ) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    // Step 1: Check if the user is authenticated
    const authenticated = await this.keycloakService.isLoggedIn();
    console.log('User Authenticated:', authenticated);  // Log authentication status

    if (!authenticated) {
      console.log('User is not authenticated. Redirecting to login.');
      await this.keycloakService.login();  // Trigger login if the user is not authenticated
      return false; // Prevent access until after login
    }

    // Step 2: Log user details (username, email, etc.)
    const userDetails = await this.keycloakService.loadUserProfile();
    console.log('User Details:', userDetails);  // Log the user's details

    // You can access user details like this:
    console.log('User Username:', userDetails.username);  // Log username
    console.log('User Email:', userDetails.email);        // Log email (if available)

    // Step 3: Check if the user has the required role
    const requiredRole = route.data['role'];
    console.log('Required Role for this route:', requiredRole);  // Log the required role

    const roles = await this.keycloakService.getUserRoles();  // Get the user's roles
    console.log('User Roles:', roles);  // Log the roles of the user

    if (requiredRole && !roles.includes(requiredRole)) {
      console.log('Access Denied. User does not have the required role.');
      this.router.navigate(['/forbidden']);  // Redirect to the forbidden page if the role is missing
      return false;
    }

    // Step 4: Allow access if the user is authenticated and has the required role
    console.log('Access granted.');
    return true;
  }
}
