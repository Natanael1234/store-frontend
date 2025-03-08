import { AuthRequestRoutes } from './auth.request-routes';

describe('AuthRequestRoutes', () => {
  it('should be defined', () => {
    expect(AuthRequestRoutes).toBeDefined();
  });

  it('should have valid keys and values', () => {
    const fields: any = { ...AuthRequestRoutes };
    expect(fields).toEqual({
      /** authentication/register */
      REGISTER: {
        url: 'authentication/register',
        method: 'post',
      },
      /** authentication/login */
      LOGIN: {
        url: 'authentication/login',
        method: 'post',
      },
      /** authentication/new-password */
      NEW_PASSWORD: {
        url: 'authentication/new-password',
        method: 'post',
      },
      /** authentication/update-logged-in-user-password */
      UPDATE_LOGGED_IN_USER_PASSWORD: {
        url: 'authentication/update-logged-in-user-password',
        method: 'post',
      },
      /** authentication/request-password-creation */
      REQUEST_PASSWORD_CREATION: {
        url: 'authentication/request-password-creation',
        method: 'post',
      },
      /** authentication/edit-own-profile */
      EDIT_OWN_PROFILE: {
        url: 'authentication/edit-own-profile',
        method: 'post',
      },
      /** authentication/refresh */
      REFRESH: {
        url: 'authentication/refresh',
        method: 'post',
      } /** GET users */,
      GET_USERS: {
        url: 'users',
        method: 'post',
      },
      /** POST users/:identifier */
      POST_USER: {
        url: 'users',
        method: 'post',
      },
      /** PATCH users/:identifier */
      PATCH_USER: {
        url: 'users',
        method: 'patch',
      },
    });
  });
});
