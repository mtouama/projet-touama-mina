import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { appRoutingProviders } from './app/app.routes'; 

bootstrapApplication(AppComponent, {
  providers: [
    appRoutingProviders,
    importProvidersFrom(HttpClientModule), // Ajout pour HttpClient
  ],
}).catch((err) => console.error(err));
