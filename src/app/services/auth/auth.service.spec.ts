import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

import { HttpService } from '../http/http.service';
import { RegisterRequestDto } from './dtos/register.request.dto';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthResponseDto } from './dtos/auth.response.dto';
import { Role } from '../user/role/role.enum';
import { TokenService } from '../token/token.service';

describe('AuthService', () => {
  let httpServiceStub: Partial<HttpService>;
  let tokenServiceStub: Partial<TokenService>;
  let authService: AuthService;

  const data: RegisterRequestDto = {
    name: 'User 1',
    email: 'user1@email.com',
    password: 'Password123$',
    repeatPassword: 'Password123$',
    acceptTerms: true,
  };

  const mockAuthResponse: AuthResponseDto = {
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
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDY5ODcxMjEsImV4cCI6MTcwNzA3MzUyMSwic3ViIjoiODkxZGIzMWUtZGZiNS00MmVkLWI5MTItNDhiOTg0NjNiMDA0In0.LaW-Z0DkU5ZheRtst0mvZ3WtMgMmMeawJVke9qtCVyE',
        refreshToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDY5ODcxMjEsImV4cCI6NDI5ODk4NzEyMSwic3ViIjoiODkxZGIzMWUtZGZiNS00MmVkLWI5MTItNDhiOTg0NjNiMDA0IiwianRpIjoiMTI4In0.bJTClITMvD5NCDt5DjTmxn3DIjFOabEvsCvnK795VXU',
      },
    },
  };

  beforeEach(() => {
    httpServiceStub = {
      post: jasmine.createSpy('post').and.returnValue(of(mockAuthResponse)),
    };
    tokenServiceStub = {
      setToken: jasmine.createSpy('setToken').and.returnValue(undefined),
      getToken: jasmine
        .createSpy('getToken')
        .and.returnValue(of('example_token')),
      getRefreshToken: jasmine
        .createSpy('getRefreshToken')
        .and.returnValue(of('example_refresh_token')),
      setRefreshToken: jasmine
        .createSpy('setRefreshToken')
        .and.returnValue(undefined),

      clearTokens: jasmine.createSpy('clearTokens').and.returnValue(undefined),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HttpService, useValue: httpServiceStub },
        { provide: TokenService, useValue: tokenServiceStub },
      ],
    });

    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('register', () => {
    it('should call HttpService post method with correct parameters', () => {
      authService.register(data).subscribe({
        next: (value: AuthResponseDto) => {
          expect(value).toEqual(mockAuthResponse);
        },
        error: (err: any) => {
          expect(true).withContext('not expected error').toBeFalsy();
        },
        complete: () => {
          expect(httpServiceStub.post).toHaveBeenCalledWith(
            '/authentication/register',
            data
          );
          expect(tokenServiceStub.setToken).toHaveBeenCalledOnceWith(
            mockAuthResponse.data.payload.token
          );
          expect(tokenServiceStub.setRefreshToken).toHaveBeenCalledOnceWith(
            mockAuthResponse.data.payload.refreshToken
          );
        },
      });
    });

    it('should fail to register user', () => {
      httpServiceStub.post = () =>
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
});
