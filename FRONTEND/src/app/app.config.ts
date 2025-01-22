import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { PanierState } from './states/panier.states';
import { ApiService } from './service/api.service';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    NgxsModule.forRoot([PanierState]).providers!, // Notez le .providers!
    provideHttpClient(),
    ApiService,
    provideZoneChangeDetection({ eventCoalescing: true })
  ]
};