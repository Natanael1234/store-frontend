import { Routes } from '@angular/router';
import routeConfig from './routes';
import { HomeComponent } from '../../../pages/home/home.component';
import { RegisterComponent } from '../../../pages/register/register.component';
import { LoginComponent } from '../../../pages/login/login.component';
import { NewPasswordComponent } from '../../../pages/new-password/new-password.component';
import { UpdateLoggedInUserPasswordComponent } from '../../../pages/update-logged-in-user-password/update-logged-in-user-password.component';
import { RequestPasswordChangeLinkComponent } from '../../../pages/request-password-change-link/request-password-change-link.component';
import { AuthGuard } from '../../../guards/auth.guard';

describe('routeConfig', () => {
  it('should be defined', () => {
    expect(routeConfig).toBeDefined();
  });

  it('should have valid keys and values', () => {
    expect(routeConfig).toEqual([
      { path: '', component: HomeComponent, title: 'Home Page' },
      {
        path: 'register',
        component: RegisterComponent,
        title: 'Register Page',
      },
      {
        path: 'login',
        component: LoginComponent,
        title: 'Login Page',
      },
      {
        path: 'new-password/:hash',
        component: NewPasswordComponent,
        title: 'New Password Page',
      },
      {
        path: 'update-password',
        component: UpdateLoggedInUserPasswordComponent,
        title: 'Update Password Page',
        canActivate: [AuthGuard],
      },
      {
        path: 'request-password-change-link',
        component: RequestPasswordChangeLinkComponent,
        title: 'Request Password Change Link Page',
      },
    ]);
  });
});
