import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthResponseDto } from '@services/auth/dtos/auth.response.dto';
import { EditOwnProfileRequestDto } from '@services/auth/dtos/edit-own-profile.request.dto';
import { LoginRequestDto } from '@services/auth/dtos/login.request.dto';
import { NewPasswordRequestDto } from '@services/auth/dtos/new-password.request.dto';
import { RegisterRequestDto } from '@services/auth/dtos/register.request.dto';
import { RequestPasswordChangeLinkRequestDto } from '@services/auth/dtos/request-password-creation-link.request.dto';
import { UpdateLoggedInUserPasswordRequestDto } from '@services/auth/dtos/update-logged-in-user-password.request.dto';
import { AuthRequestRoutes } from '@services/auth/request-routes/auth.request-routes';
import { HttpService } from '@services/http/http.service';
import { TokenService } from '@services/token/token.service';
import { normalizeException } from '@utils/exception-normalizer/exception-normalizer';
import { Observable, of, Subscriber } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    httpService: HttpService = inject(HttpService);
    tokenService: TokenService = inject(TokenService);

    constructor() {}

    register(data: RegisterRequestDto): Observable<AuthResponseDto> {
        return new Observable((observer: Subscriber<AuthResponseDto>) => {
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
        });
    }

    login(data: LoginRequestDto): Observable<AuthResponseDto> {
        return new Observable((observer: Subscriber<AuthResponseDto>) => {
            const observable = this.httpService.post({
                path: AuthRequestRoutes.LOGIN.url,
                data,
            });

            observable.subscribe({
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
        });
    }

    createNewPassword(
        data: NewPasswordRequestDto,
    ): Observable<AuthResponseDto> {
        return new Observable((observer: Subscriber<AuthResponseDto>) => {
            const observable = this.httpService.post({
                path: AuthRequestRoutes.NEW_PASSWORD.url,
                data,
            });

            observable.subscribe({
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
        });
    }

    updateLoggedInUserPassword(
        data: UpdateLoggedInUserPasswordRequestDto,
    ): Observable<AuthResponseDto> {
        return new Observable((observer: Subscriber<AuthResponseDto>) => {
            const observable = this.httpService.post({
                path: AuthRequestRoutes.UPDATE_LOGGED_IN_USER_PASSWORD.url,
                data,
            });

            observable.subscribe({
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
        });
    }

    requestPasswordChangeLink(
        data: RequestPasswordChangeLinkRequestDto,
    ): Observable<boolean> {
        return new Observable((observer: Subscriber<boolean>) => {
            const observable = this.httpService.post({
                path: AuthRequestRoutes.REQUEST_PASSWORD_CREATION.url,
                data,
            });

            observable.subscribe({
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
        });
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
            },
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
                    .post({
                        path: AuthRequestRoutes.REFRESH.url,
                        data: { refreshToken },
                    })
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
            },
        );

        return refreshTokenObservable;
    }

    private processAuthResponse(
        observer: Subscriber<any>,
        response: AuthResponseDto,
    ) {
        this.tokenService.setAccessToken(response.data?.payload?.token!);
        this.tokenService.setRefreshToken(
            response.data?.payload?.refreshToken!,
        );
        observer.next(response);
    }
}
