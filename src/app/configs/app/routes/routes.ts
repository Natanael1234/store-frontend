import { Routes } from '@angular/router';
import { AuthGuard } from '../../../guards/auth.guard';
import { HomeComponent } from '../../../pages/home/home.component';
import { LoginComponent } from '../../../pages/login/login.component';
import { NewPasswordComponent } from '../../../pages/new-password/new-password.component';
import { RegisterComponent } from '../../../pages/register/register.component';
import { RequestPasswordChangeLinkComponent } from '../../../pages/request-password-change-link/request-password-change-link.component';
import { UpdateLoggedInUserPasswordComponent } from '../../../pages/update-logged-in-user-password/update-logged-in-user-password.component';
import { UserComponent } from '../../../pages/user/user.component';
import { UsersComponent } from '../../../pages/users/users.component';

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
        canActivate: [AuthGuard],
    },
    {
        path: 'request-password-change-link',
        component: RequestPasswordChangeLinkComponent,
        title: 'Request Password Change Link Page',
    },
    {
        path: 'users',
        component: UsersComponent,
        title: 'Users',
        canActivate: [AuthGuard],
    },
    {
        path: 'user',
        component: UserComponent,
        title: 'User',
        canActivate: [AuthGuard],
    },
];

export default routeConfig;
