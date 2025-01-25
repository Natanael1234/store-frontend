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
        authenticationRequired: false,
      },
      /** authentication/login */
      LOGIN: {
        url: 'authentication/login',
        method: 'post',
        authenticationRequired: false,
      },
      /** authentication/new-password */
      NEW_PASSWORD: {
        url: 'authentication/new-password',
        method: 'post',
        authenticationRequired: false,
      },
      /** authentication/update-logged-in-user-password */
      UPDATE_LOGGED_IN_USER_PASSWORD: {
        url: 'authentication/update-logged-in-user-password',
        method: 'post',
        authenticationRequired: true,
      },
      /** authentication/request-password-creation */
      REQUEST_PASSWORD_CREATION: {
        url: 'authentication/request-password-creation',
        method: 'post',
        authenticationRequired: false,
      },
      /** authentication/edit-own-profile */
      EDIT_OWN_PROFILE: {
        url: 'authentication/edit-own-profile',
        method: 'post',
        authenticationRequired: true,
      },
      /** authentication/refresh */
      REFRESH: {
        url: 'authentication/refresh',
        method: 'post',
        authenticationRequired: false,
      },
    });
  });
});
