import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
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
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly httpService = inject(HttpService);
    private readonly tokenService = inject(TokenService);

    register(data: RegisterRequestDto): Observable<AuthResponseDto> {
        return this.httpService
            .post<AuthResponseDto>({ path: AuthRequestRoutes.REGISTER.url, data })
            .pipe(
                tap((response) => this.processAuthTokens(response)),
                catchError(this.handleError),
            );
    }

    login(data: LoginRequestDto): Observable<AuthResponseDto> {
        return this.httpService
            .post<AuthResponseDto>({ path: AuthRequestRoutes.LOGIN.url, data })
            .pipe(
                tap((response) => this.processAuthTokens(response)),
                catchError(this.handleError),
            );
    }

    createNewPassword(data: NewPasswordRequestDto): Observable<AuthResponseDto> {
        return this.httpService
            .post<AuthResponseDto>({ path: AuthRequestRoutes.NEW_PASSWORD.url, data })
            .pipe(
                tap((response) => this.processAuthTokens(response)),
                catchError(this.handleError),
            );
    }

    updateLoggedInUserPassword(
        data: UpdateLoggedInUserPasswordRequestDto,
    ): Observable<AuthResponseDto> {
        return this.httpService
            .post<AuthResponseDto>({
                path: AuthRequestRoutes.UPDATE_LOGGED_IN_USER_PASSWORD.url,
                data,
            })
            .pipe(
                tap((response) => this.processAuthTokens(response)),
                catchError(this.handleError),
            );
    }

    requestPasswordChangeLink(data: RequestPasswordChangeLinkRequestDto): Observable<boolean> {
        return this.httpService
            .post<boolean>({
                path: AuthRequestRoutes.REQUEST_PASSWORD_CREATION.url,
                data,
            })
            .pipe(catchError(this.handleError));
    }

    editOwnProfile(data: EditOwnProfileRequestDto): Observable<boolean> {
        return this.httpService
            .post<boolean>({
                path: AuthRequestRoutes.EDIT_OWN_PROFILE.url,
                data,
            })
            .pipe(
                map(() => true),
                catchError(this.handleError),
            );
    }

    isAuthenticated(): boolean {
        return !!this.tokenService.getAccessToken();
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

        return this.httpService
            .post<AuthResponseDto>({
                path: AuthRequestRoutes.REFRESH.url,
                data: { refreshToken },
            })
            .pipe(
                map((response) => {
                    const accessToken = response.data?.payload?.token ?? null;
                    if (accessToken) {
                        this.tokenService.setAccessToken(accessToken);
                    } else {
                        this.tokenService.clearTokens();
                    }
                    return accessToken;
                }),
                catchError((error: unknown) => {
                    if (
                        error instanceof HttpErrorResponse &&
                        error.status === HttpStatusCode.Unauthorized
                    ) {
                        this.tokenService.clearTokens();
                        return of(null);
                    }
                    return this.handleError(error);
                }),
            );
    }

    private processAuthTokens(response: AuthResponseDto): void {
        const token = response.data?.payload?.token;
        const refreshToken = response.data?.payload?.refreshToken;

        // if (token)
        this.tokenService.setAccessToken(token);
        // if (refreshToken)
        this.tokenService.setRefreshToken(refreshToken!);
    }

    private handleError(error: unknown): Observable<never> {
        return throwError(() => normalizeException(error));
    }
}
