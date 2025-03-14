import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { CustomersComponent } from './components/customers/customers.component';
import {HttpClientModule} from '@angular/common/http';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';


// Initialize Keycloak using the KeycloakService and Keycloak configuration
export function initializeKeycloak(keycloakService: KeycloakService) {
  console.log('Initializing Keycloak...');
  return () =>
    keycloakService.init({
      config: {
        url: 'http://localhost:8080',  // Keycloak server URL
        realm: 'enset-bdcc-realm',  // Realm ID
        clientId: 'ecom-client-angular'  // Client ID
      },
      initOptions: {
        onLoad: 'check-sso',  // Silent login check
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'  // Silent check URI
      }
    }).then(() => {
      console.log('Keycloak initialized successfully');
      console.log( window.location.origin);
    }).catch((error) => {
      console.error('Keycloak initialization failed', error);
    });
}

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CustomersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    KeycloakAngularModule
  ],
  providers: [
    // Initialize Keycloak before the app starts
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      deps: [KeycloakService],
      multi: true
    },
    KeycloakService  // Ensure KeycloakService is provided
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
