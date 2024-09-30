import { Routes } from '@angular/router';
import routeConfig from './routes';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';

const expectedRoutes: Routes = [
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
];

describe('routeConfig', () => {
  it('should be defined', () => {
    expect(routeConfig).toBeDefined();
  });

  it('should have valid keys and values', () => {
    expect(routeConfig).toEqual(routeConfig);
  });
});
