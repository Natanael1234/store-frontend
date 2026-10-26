/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/configs/app/app.config'; // TODO:
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import routeConfig from '@configs/app/routes/routes';
import { AuthInterceptor } from '@interceptors/auth/auth.interceptor';
import { AppComponent } from './app/app.component';

// https://medium.com/@neerajabandi/angular-httpinterceptors-standalone-applications-part-5-dd855f052d45
bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routeConfig),
        provideHttpClient(withInterceptorsFromDi()),
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
}).catch((err) => console.error(err));
