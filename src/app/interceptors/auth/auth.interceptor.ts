import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { TokenService } from '../../services/token/token.service';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  filter,
  Observable,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { AuthResponseDto } from '../../services/auth/dtos/auth.response.dto';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const urlsToExclude = [
      '/authentication/register',
      'authentication/login',
      'authentication/new-password',
      'authentication/request-password-creation',
      '/authentication/refresh',
    ];

    // Verifique se a URL da requisição está na lista de exclusão
    if (urlsToExclude.some((url) => req.url.includes(url))) {
      return next.handle(req); // Passa a requisição sem modificá-la
    }

    const accessToken = this.tokenService.getAccessToken();
    let clonedReq = req; // TODO: it is not really cloning
    // if access token not found
    if (!accessToken) {
      // try to refresh token
      return this.refreshToken(req, next);
    }
    // if access token found
    else {
      // add access token to request
      clonedReq = this.addToken(req, accessToken);
      // return request
      return next.handle(clonedReq).pipe(
        // in case of errors on the request
        catchError((error) => {
          // if unauthorized error
          if (
            error instanceof HttpErrorResponse &&
            error.status === HttpStatusCode.Unauthorized
          ) {
            // try to refresh token
            return this.refreshToken(req, next);
          }
          // if other errors
          else {
            // throw errors
            return throwError(() => error);
          }
        })
      );
    }
  }

  private refreshToken(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // if not refreshing access token
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      // refreshes the access token
      return this.authService.refreshToken().pipe(
        switchMap((accessToken: string | null) => {
          this.isRefreshing = false;
          // if not authenticated

          if (accessToken === null) {
            // redirects to login
            this.router.navigate(['/login']);
          }
          this.refreshTokenSubject.next(accessToken);
          // adds the new access token to the request
          return next.handle(this.addToken(req, accessToken));
        }),
        // if failed to refresh the access token
        catchError((err) => {
          this.isRefreshing = false;
          // throws error
          return throwError(() => err);
        })
      );
    }
    // if refreshing access token
    else {
      return this.refreshTokenSubject.pipe(
        filter((isAuthenticated) => isAuthenticated !== null),
        take(1),
        switchMap((accessToken) => next.handle(this.addToken(req, accessToken)))
      );
    }
  }

  private addToken(
    req: HttpRequest<any>,
    accessToken: string | null
  ): HttpRequest<any> {
    return req.clone({
      setHeaders: { Authorization: `Bearer ${accessToken || ''}` },
    });
  }
}
