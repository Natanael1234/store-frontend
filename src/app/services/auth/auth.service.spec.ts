import { of, throwError } from 'rxjs';
import { HttpService } from '../http/http.service';
import { TokenService } from '../token/token.service';
import { Role } from '../user/role/role.enum';
import { AuthResponseDto } from './dtos/auth.response.dto';
import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dtos/register.request.dto';
import { LoginRequestDto } from './dtos/login.request.dto';
import { NewPasswordRequestDto } from './dtos/new-password.request.dto';
import { RequestPasswordChangeLinkRequestDto } from './dtos/request-password-creation-link.request.dto';
import { UpdateLoggedInUserPasswordRequestDto } from './dtos/update-logged-in-user-password.request.dto';

const TEST_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDY5ODcxMjEsImV4cCI6MTcwNzA3MzUyMSwic3ViIjoiODkxZGIzMWUtZGZiNS00MmVkLWI5MTItNDhiOTg0NjNiMDA0In0.LaW-Z0DkU5ZheRtst0mvZ3WtMgMmMeawJVke9qtCVyE';
const TEST_REFRESH_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDY5ODcxMjEsImV4cCI6NDI5ODk4NzEyMSwic3ViIjoiODkxZGIzMWUtZGZiNS00MmVkLWI5MTItNDhiOTg0NjNiMDA0IiwianRpIjoiMTI4In0.bJTClITMvD5NCDt5DjTmxn3DIjFOabEvsCvnK795VXU';

let mockAuthResponse: AuthResponseDto = {
  status: 'success',
  data: {
    user: {
      id: '891db31e-dfb5-42ed-b912-48b98463b004',
      name: 'John Doe',
      email: 'john@example.com',
      roles: [Role.USER],
      active: true,
      created: '2024-02-03T19:05:21.689Z',
      updated: '2024-02-03T19:05:21.689Z',
      deletedAt: null,
    },
    payload: {
      type: 'bearer',
      token: TEST_TOKEN,
      refreshToken: TEST_REFRESH_TOKEN,
    },
  },
};

describe('AuthService', () => {
  let authService: AuthService;
  let mockedHttpService: any;
  let mockedTokenService: any;

  beforeEach(async () => {
    mockedTokenService = jasmine.createSpyObj('TokenService', [
      'getToken',
      'setToken',
      'getRefreshToken',
      'setRefreshToken',
      'clearTokens',
    ]);

    mockedHttpService = jasmine.createSpyObj('HttpService', ['post']);

    TestBed.configureTestingModule({
      providers: [
        { provide: TokenService, useValue: mockedTokenService },
        { provide: HttpService, useValue: mockedHttpService },
        AuthService,
      ],
    });

    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('register', () => {
    it('should call register method', async () => {
      const authesponse: RegisterRequestDto = {
        name: 'User 1',
        email: 'user1@email.com',
        password: 'Password123$',
        repeatPassword: 'Password123$',
        acceptTerms: true,
      };

      mockedHttpService.post.and.returnValue(of(mockAuthResponse));
      mockedTokenService.setToken.and.returnValue(null);
      mockedTokenService.setRefreshToken.and.returnValue(null);

      authService.register(authesponse).subscribe({
        next: (registerResponse: AuthResponseDto) => {
          expect(mockedHttpService.post)
            .withContext('httpService.post "authentication/register" call')
            .toHaveBeenCalledOnceWith('authentication/register', authesponse);

          expect(registerResponse)
            .withContext('httpService.post "authentication/register" response')
            .toEqual(mockAuthResponse);

          expect(mockedTokenService.setToken)
            .withContext('tokenService.setToken call')
            .toHaveBeenCalledOnceWith(mockAuthResponse.data.payload.token);

          expect(mockedTokenService.setRefreshToken)
            .withContext('tokenService.setRefreshToken call')
            .toHaveBeenCalledOnceWith(
              mockAuthResponse.data.payload.refreshToken
            );
        },
        error: (error: HttpErrorResponse) => {
          expect(true).withContext('Error not expected.').toBeFalsy();
        },
      });
    });

    it('should fail calling register method', async () => {
      mockedHttpService.post = () =>
        throwError(() => new Error('Simulated error'));

      const registerDto: RegisterRequestDto = {
        name: 'Usuário Teste',
        email: 'usuario@teste.com',
        password: 'senha',
        repeatPassword: 'senha',
        acceptTerms: true,
      };

      authService.register(registerDto).subscribe({
        error: (err) => {
          expect(err).toEqual('Simulated error');
        },
        complete: () => {
          expect(true).withContext('not reachable code').toBeFalsy();
        },
      });
    });
  });

  describe('login', () => {
    it('should call login method', () => {
      const loginData: LoginRequestDto = {
        email: 'User 1',
        password: 'Password123$',
      };

      mockedHttpService.post.and.returnValue(of(mockAuthResponse));
      mockedTokenService.setToken.and.returnValue(null);
      mockedTokenService.setRefreshToken.and.returnValue(null);

      authService.login(loginData).subscribe({
        next: (authesponse: AuthResponseDto) => {
          expect(mockedHttpService.post)
            .withContext('httpService.post "authentication/login" call')
            .toHaveBeenCalledOnceWith('authentication/login', loginData);

          expect(authesponse)
            .withContext('httpService.post "authentication/login" response')
            .toEqual(mockAuthResponse);

          expect(mockedTokenService.setToken)
            .withContext('tokenService.setToken call')
            .toHaveBeenCalledOnceWith(mockAuthResponse.data.payload.token);

          expect(mockedTokenService.setRefreshToken)
            .withContext('tokenService.setRefreshToken call')
            .toHaveBeenCalledOnceWith(
              mockAuthResponse.data.payload.refreshToken
            );
        },
        error: (error: HttpErrorResponse) => {
          expect(true).withContext('Error not expected.').toBeFalsy();
        },
      });
    });

    it('should fail calling login method', () => {
      mockedHttpService.post = () =>
        throwError(() => new Error('Simulated error'));

      const loginDto: LoginRequestDto = {
        email: 'usuario@teste.com',
        password: 'senha',
      };

      authService.login(loginDto).subscribe({
        error: (err) => {
          expect(err).toEqual('Simulated error');
        },
        complete: () => {
          expect(true).withContext('not reachable code').toBeFalsy();
        },
      });
    });
  });

  describe('createNewPassword', () => {
    it('should call createNewPassword method', async () => {
      const createNewPasswordData: NewPasswordRequestDto = {
        hash: 'User 1',
        password: 'Password123$',
        repeatPassword: 'Password123$',
      };

      mockedHttpService.post.and.returnValue(of(mockAuthResponse));
      mockedTokenService.setToken.and.returnValue(null);
      mockedTokenService.setRefreshToken.and.returnValue(null);

      authService.createNewPassword(createNewPasswordData).subscribe({
        next: (authesponse: AuthResponseDto) => {
          expect(mockedHttpService.post)
            .withContext('httpService.post "authentication/new-password" call')
            .toHaveBeenCalledOnceWith(
              'authentication/new-password',
              createNewPasswordData
            );

          expect(authesponse)
            .withContext(
              'httpService.post "authentication/new-password" response'
            )
            .toEqual(mockAuthResponse);

          expect(mockedTokenService.setToken)
            .withContext('tokenService.setToken call')
            .toHaveBeenCalledOnceWith(mockAuthResponse.data.payload.token);

          expect(mockedTokenService.setRefreshToken)
            .withContext('tokenService.setRefreshToken call')
            .toHaveBeenCalledOnceWith(
              mockAuthResponse.data.payload.refreshToken
            );
        },
        error: (error: HttpErrorResponse) => {
          expect(true).withContext('Error not expected.').toBeFalsy();
        },
      });
    });

    it('should fail calling createNewPassword method', async () => {
      mockedHttpService.post = () =>
        throwError(() => new Error('Simulated error'));

      const newPasswordDto: NewPasswordRequestDto = {
        hash: 'SOME_HASH',
        password: 'senha',
        repeatPassword: 'senha',
      };

      authService.createNewPassword(newPasswordDto).subscribe({
        error: (err) => {
          expect(err).toEqual('Simulated error');
        },
        complete: () => {
          expect(true).withContext('not reachable code').toBeFalsy();
        },
      });
    });
  });

  describe('requestPasswordChangeLink', () => {
    it('should call requestPasswordChangeLink method', async () => {
      const requestPasswordChangeLinkRequestDto: RequestPasswordChangeLinkRequestDto =
        { email: 'user1@email.com' };

      mockedHttpService.post.and.returnValue(of(true));

      authService
        .requestPasswordChangeLink(requestPasswordChangeLinkRequestDto)
        .subscribe({
          next: (registerResponse: boolean) => {
            expect(mockedHttpService.post)
              .withContext(
                'httpService.post "authentication/request-password-creation" call'
              )
              .toHaveBeenCalledOnceWith(
                'authentication/request-password-creation',
                requestPasswordChangeLinkRequestDto
              );

            expect(registerResponse)
              .withContext(
                'httpService.post "authentication/request-password-creationr" response'
              )
              .toBeTrue();
          },
          error: (error: HttpErrorResponse) => {
            expect(true).withContext('Error not expected.').toBeFalsy();
          },
        });
    });

    it('should fail calling requestPasswordChangeLink method', async () => {
      mockedHttpService.post = () =>
        throwError(() => new Error('Simulated error'));

      const requestPasswordChangeLinkDto: RequestPasswordChangeLinkRequestDto =
        { email: 'usuario@teste.com' };

      authService
        .requestPasswordChangeLink(requestPasswordChangeLinkDto)
        .subscribe({
          error: (err) => {
            expect(err).toEqual('Simulated error');
          },
          complete: () => {
            expect(true).withContext('not reachable code').toBeFalsy();
          },
        });
    });
  });

  describe('updateLoggedInUserPassword', () => {
    it('should call updateLoggedInUserPassword method', async () => {
      const updateLogedInUserPasswordData: UpdateLoggedInUserPasswordRequestDto =
        { password: 'Password123$', repeatPassword: 'Password123$' };

      mockedHttpService.post.and.returnValue(of(mockAuthResponse));
      mockedTokenService.setToken.and.returnValue(null);
      mockedTokenService.getToken.and.returnValue(
        mockAuthResponse.data.payload.token
      );
      mockedTokenService.setRefreshToken.and.returnValue(null);

      authService
        .updateLoggedInUserPassword(updateLogedInUserPasswordData)
        .subscribe({
          next: (authesponse: AuthResponseDto) => {
            expect(mockedHttpService.post)
              .withContext(
                'httpService.post "authentication/update-logged-in-user-password" call'
              )
              .toHaveBeenCalledOnceWith(
                'authentication/update-logged-in-user-password',
                updateLogedInUserPasswordData
              );

            expect(authesponse)
              .withContext(
                'httpService.post "authentication/update-logged-in-user-password" response'
              )
              .toEqual(mockAuthResponse);

            expect(mockedTokenService.setToken)
              .withContext('tokenService.setToken call')
              .toHaveBeenCalledOnceWith(mockAuthResponse.data.payload.token);

            expect(mockedTokenService.setRefreshToken)
              .withContext('tokenService.setRefreshToken call')
              .toHaveBeenCalledOnceWith(
                mockAuthResponse.data.payload.refreshToken
              );
          },
          error: (error: HttpErrorResponse) => {
            expect(true).withContext('Error not expected.').toBeFalsy();
          },
        });
    });

    it('should fail calling createNewPassword method', async () => {
      mockedHttpService.post = () =>
        throwError(() => new Error('Simulated error'));

      const updateLoggedInUserPasswordDto: UpdateLoggedInUserPasswordRequestDto =
        { password: 'senha', repeatPassword: 'senha' };

      authService
        .updateLoggedInUserPassword(updateLoggedInUserPasswordDto)
        .subscribe({
          error: (err) => {
            expect(err).toEqual('Simulated error');
          },
          complete: () => {
            expect(true).withContext('not reachable code').toBeFalsy();
          },
        });
    });
  });
});
