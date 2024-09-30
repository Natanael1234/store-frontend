import { Routes } from '@angular/router';
import { RegisterComponent } from '../../../pages/register/register.component';
import { LoginComponent } from '../../../pages/login/login.component';
import { NewPasswordComponent } from '../../../pages/new-password/new-password.component';
import { HomeComponent } from '../../../pages/home/home.component';

const routeConfig: Routes = [
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

export default routeConfig;
