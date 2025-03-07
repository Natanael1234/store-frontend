import { Injectable, OnInit, inject } from '@angular/core';
import { Observable, of, Subscriber, throwError } from 'rxjs';
import { RegisterRequestDto } from './dtos/register.request.dto';
import { HttpService } from '../http/http.service';
import { AuthResponseDto } from './dtos/auth.response.dto';
import { TokenService } from '../token/token.service';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { LoginRequestDto } from './dtos/login.request.dto';
import { NewPasswordRequestDto } from './dtos/new-password.request.dto';
import { RequestPasswordChangeLinkRequestDto } from './dtos/request-password-creation-link.request.dto';
import { UpdateLoggedInUserPasswordRequestDto } from './dtos/update-logged-in-user-password.request.dto';
import { EditOwnProfileRequestDto } from './dtos/edit-own-profile.request.dto';
import { AuthRequestRoutes } from './request-routes/auth.request-routes';
import { normalizeException } from '../../utils/exception-normalizer/exception-normalizer';

@Injectable({ providedIn: 'root' })
export class AuthService {
  httpService: HttpService = inject(HttpService);
  tokenService: TokenService = inject(TokenService);

  constructor() {}

  register(data: RegisterRequestDto): Observable<AuthResponseDto> {
    const registerObservable = new Observable(
      (observer: Subscriber<AuthResponseDto>) => {
        this.httpService
          .post({ path: AuthRequestRoutes.REGISTER.url, data })
          .subscribe({
            next: (response: AuthResponseDto) => {
              this.processAuthResponse(observer, response);
            },
            error: (error: HttpErrorResponse | Error) => {
              observer.error(normalizeException(error));
            },
            complete: () => {
              observer.complete();
            },
          });
      }
    );

    return registerObservable;
  }

  login(data: LoginRequestDto): Observable<AuthResponseDto> {
    const loginObservable = new Observable(
      (observer: Subscriber<AuthResponseDto>) => {
        const postObservable = this.httpService.post({
          path: AuthRequestRoutes.LOGIN.url,
          data,
        });

        postObservable.subscribe({
          next: (response: AuthResponseDto) => {
            this.processAuthResponse(observer, response);
          },
          error: (error: any) => {
            observer.error(normalizeException(error));
          },
          complete: () => {
            observer.complete();
          },
        });
      }
    );

    return loginObservable;
  }

  createNewPassword(data: NewPasswordRequestDto): Observable<AuthResponseDto> {
    const newPasswordObservable = new Observable(
      (observer: Subscriber<AuthResponseDto>) => {
        const postObservable = this.httpService.post({
          path: AuthRequestRoutes.NEW_PASSWORD.url,
          data,
        });

        postObservable.subscribe({
          next: (response: AuthResponseDto) => {
            this.processAuthResponse(observer, response);
          },
          error: (error: any) => {
            observer.error(normalizeException(error));
          },
          complete: () => {
            observer.complete();
          },
        });
      }
    );

    return newPasswordObservable;
  }

  updateLoggedInUserPassword(
    data: UpdateLoggedInUserPasswordRequestDto
  ): Observable<AuthResponseDto> {
    const newPasswordObservable = new Observable(
      (observer: Subscriber<AuthResponseDto>) => {
        const postObservable = this.httpService.post({
          path: AuthRequestRoutes.UPDATE_LOGGED_IN_USER_PASSWORD.url,
          data,
        });

        postObservable.subscribe({
          next: (response: AuthResponseDto) => {
            this.processAuthResponse(observer, response);
          },
          error: (error: any) => {
            observer.error(normalizeException(error));
          },
          complete: () => {
            observer.complete();
          },
        });
      }
    );

    return newPasswordObservable;
  }

  requestPasswordChangeLink(
    data: RequestPasswordChangeLinkRequestDto
  ): Observable<boolean> {
    const requestPasswordChangeLinkObservable = new Observable(
      (observer: Subscriber<boolean>) => {
        const postObservable = this.httpService.post({
          path: AuthRequestRoutes.REQUEST_PASSWORD_CREATION.url,
          data,
        });

        postObservable.subscribe({
          next: (response: boolean) => {
            observer.next(response);
          },
          error: (error: any) => {
            observer.error(normalizeException(error));
          },
          complete: () => {
            observer.complete();
          },
        });
      }
    );

    return requestPasswordChangeLinkObservable;
  }

  editOwnProfile(data: EditOwnProfileRequestDto): Observable<true> {
    const editOwnProfileObservable = new Observable(
      (observer: Subscriber<true>) => {
        const postObservable = this.httpService.post({
          path: AuthRequestRoutes.EDIT_OWN_PROFILE.url,
          data,
        });

        postObservable.subscribe({
          next: (response: true) => {
            observer.next(true);
          },
          error: (error: any) => {
            observer.error(normalizeException(error));
          },
          complete: () => {
            observer.complete();
          },
        });
      }
    );

    return editOwnProfileObservable;
  }

  isAuthenticated(): boolean {
    const accessToken = this.tokenService.getAccessToken();
    return !!accessToken;
  }

  /**
   * Refreshes JWT using the refresh token.
   * @returns access token if successfully refreshed token, null if unauthorized or if refresh token is not defined.
   * @throws http exception in case of backend error.
   */
  refreshToken(): Observable<string | null> {
    const refreshToken = this.tokenService.getRefreshToken();

    if (!refreshToken) {
      this.tokenService.clearTokens();
      return of(null);
    }

    const refreshTokenObservable = new Observable(
      (observer: Subscriber<string | null>) => {
        this.httpService
          .post({ path: AuthRequestRoutes.REFRESH.url, data: { refreshToken } })
          .subscribe({
            next: (response: AuthResponseDto) => {
              const accessToken = response.data?.payload?.token!;
              // don't received access token
              if (!accessToken) {
                this.tokenService.clearTokens();
              }
              // received acess token
              else {
                this.tokenService.setAccessToken(accessToken);
              }
              // return access token
              observer.next(accessToken);
            },
            error: (error: any) => {
              // unauthorized
              if (
                error instanceof HttpErrorResponse &&
                error.status === HttpStatusCode.Unauthorized
              ) {
                this.tokenService.clearTokens();
                observer.next(null);
              }
              // other errors
              else {
                observer.error(normalizeException(error));
              }
            },
            complete: () => {
              observer.complete();
            },
          });
      }
    );

    return refreshTokenObservable;
  }

  private processAuthResponse(
    observer: Subscriber<any>,
    response: AuthResponseDto
  ) {
    this.tokenService.setAccessToken(response.data?.payload?.token!);
    this.tokenService.setRefreshToken(response.data?.payload?.refreshToken!);
    observer.next(response);
  }
}
