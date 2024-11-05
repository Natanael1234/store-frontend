/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/configs/app/app.config'; // TODO:
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import routeConfig from './app/configs/app/routes/routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routeConfig),
    provideHttpClient(),
    provideAnimationsAsync(),
  ],
}).catch((err) => console.error(err));
