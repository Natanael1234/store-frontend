type HttpMethod = 'post' | 'get' | 'put' | 'delete' | 'patch';
type RequestRoute = {
  url: string;
  method: HttpMethod;
};

export class AuthRequestRoutes {
  /** POST authentication/register */
  static REGISTER: RequestRoute = {
    url: 'authentication/register',
    method: 'post',
  };
  /** POST authentication/login */
  static LOGIN: RequestRoute = {
    url: 'authentication/login',
    method: 'post',
  };
  /** POST authentication/new-password */
  static NEW_PASSWORD: RequestRoute = {
    url: 'authentication/new-password',
    method: 'post',
  };
  /** POST authentication/update-logged-in-user-password */
  static UPDATE_LOGGED_IN_USER_PASSWORD: RequestRoute = {
    url: 'authentication/update-logged-in-user-password',
    method: 'post',
  };
  /** POST authentication/request-password-creation */
  static REQUEST_PASSWORD_CREATION: RequestRoute = {
    url: 'authentication/request-password-creation',
    method: 'post',
  };
  /** POST authentication/edit-own-profile */
  static EDIT_OWN_PROFILE: RequestRoute = {
    url: 'authentication/edit-own-profile',
    method: 'post',
  };
  /** POST authentication/refresh */
  static REFRESH: RequestRoute = {
    url: 'authentication/refresh',
    method: 'post',
  };
  /** GET users */
  static USERS: RequestRoute = {
    url: 'users',
    method: 'post',
  };
  // TODO:
  /** POST users/:identifier */
  static POST_USER: RequestRoute = {
    url: 'users',
    method: 'post',
  };
  // TODO:
  /** PATCH users/:identifier */
  static PATCH_USER: RequestRoute = {
    url: 'users',
    method: 'patch',
  };
}
