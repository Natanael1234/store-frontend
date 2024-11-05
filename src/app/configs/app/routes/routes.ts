import { Routes } from '@angular/router';
import { RegisterComponent } from '../../../pages/register/register.component';
import { LoginComponent } from '../../../pages/login/login.component';
import { NewPasswordComponent } from '../../../pages/new-password/new-password.component';
import { HomeComponent } from '../../../pages/home/home.component';
import { UpdateLoggedInUserPasswordComponent } from '../../../pages/update-logged-in-user-password/update-logged-in-user-password.component';

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
  {
    path: 'update-password',
    component: UpdateLoggedInUserPasswordComponent,
    title: 'Update Password Page',
  },
];

export default routeConfig;
