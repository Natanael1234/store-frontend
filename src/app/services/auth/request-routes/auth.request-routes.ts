type HttpMethod = 'post' | 'get' | 'put' | 'delete' | 'patch';
type RequestRoute = {
  url: string;
  method: HttpMethod;
  authenticationRequired: boolean;
};

export class AuthRequestRoutes {
  /** authentication/register */
  static REGISTER: RequestRoute = {
    url: 'authentication/register',
    method: 'post',
    authenticationRequired: false,
  };
  /** authentication/login */
  static LOGIN: RequestRoute = {
    url: 'authentication/login',
    method: 'post',
    authenticationRequired: false,
  };
  /** authentication/new-password */
  static NEW_PASSWORD: RequestRoute = {
    url: 'authentication/new-password',
    method: 'post',
    authenticationRequired: false,
  };
  /** authentication/update-logged-in-user-password */
  static UPDATE_LOGGED_IN_USER_PASSWORD: RequestRoute = {
    url: 'authentication/update-logged-in-user-password',
    method: 'post',
    authenticationRequired: true,
  };
  /** authentication/request-password-creation */
  static REQUEST_PASSWORD_CREATION: RequestRoute = {
    url: 'authentication/request-password-creation',
    method: 'post',
    authenticationRequired: false,
  };
  /** authentication/edit-own-profile */
  static EDIT_OWN_PROFILE: RequestRoute = {
    url: 'authentication/edit-own-profile',
    method: 'post',
    authenticationRequired: true,
  };
  /** authentication/refresh */
  static REFRESH: RequestRoute = {
    url: 'authentication/refresh',
    method: 'post',
    authenticationRequired: false,
  };
}
