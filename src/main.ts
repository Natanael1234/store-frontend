/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/configs/app/app.config'; // TODO:
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import routeConfig from './app/configs/app/routes/routes';
import { AuthInterceptor } from './app/interceptors/auth/auth.interceptor';

// https://medium.com/@neerajabandi/angular-httpinterceptors-standalone-applications-part-5-dd855f052d45
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routeConfig),
    provideHttpClient(),
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideHttpClient(withInterceptorsFromDi()),
  ],
}).catch((err) => console.error(err));
