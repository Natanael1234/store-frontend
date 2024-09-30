/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/configs/app/app.config'; // TODO:
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import routeConfig from './app/routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routeConfig),
    provideHttpClient(),

    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
  ],
}).catch((err) => console.error(err));
