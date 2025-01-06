import { AuthRequestRoutes } from './auth.request-routes';

describe('AuthRequestRoutes', () => {
  it('should be defined', () => {
    expect(AuthRequestRoutes).toBeDefined();
  });

  it('should have valid keys and values', () => {
    const fields: any = { ...AuthRequestRoutes };
    expect(fields).toEqual({
      REGISTER: 'authentication/register',
      LOGIN: 'authentication/login',
      NEW_PASSWORD: 'authentication/new-password',
      UPDATE_LOGGED_IN_USER_PASSWORD:
        'authentication/update-logged-in-user-password',
      REQUEST_PASSWORD_CREATION: 'authentication/request-password-creation',
      EDIT_OWN_PROFILE: 'authentication/edit-own-profile',
      REFRESH: 'authentication/refresh',
    });
  });
});
