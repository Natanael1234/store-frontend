import { Injectable, OnInit, inject } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { RegisterRequestDto } from './dtos/register.request.dto';
import { HttpService } from '../http/http.service';
import { AuthResponseDto } from './dtos/auth.response.dto';
import { TokenService } from '../token/token.service';
import { HttpStatusCode } from '@angular/common/http';
import { LoginRequestDto } from './dtos/login.request.dto';
import { NewPasswordRequestDto } from './dtos/new-password.request.dto';
import { RequestPasswordCreationLinkRequestDto } from './dtos/request-password-creation-link.request.dto';
import { UpdateLoggedInUserPasswordRequestDto } from './dtos/update-logged-in-user-password.request.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpService: HttpService = inject(HttpService);
  tokenService: TokenService = inject(TokenService);

  constructor() {}

  register(data: RegisterRequestDto): Observable<AuthResponseDto> {
    const registerObservable = new Observable(
      (observer: Subscriber<AuthResponseDto>) => {
        const postObservable = this.httpService.post(
          'authentication/register',
          data
        );
        postObservable.subscribe({
          next: (response: AuthResponseDto) => {
            this.processAuthResponse(observer, response);
          },
          error: (error: any) => {
            this.processError(observer, error);
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
        const postObservable = this.httpService.post(
          'authentication/login',
          data
        );

        postObservable.subscribe({
          next: (response: AuthResponseDto) => {
            this.processAuthResponse(observer, response);
          },
          error: (error: any) => {
            this.processError(observer, error);
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
        const postObservable = this.httpService.post(
          'authentication/new-password',
          data
        );

        postObservable.subscribe({
          next: (response: AuthResponseDto) => {
            this.processAuthResponse(observer, response);
          },
          error: (error: any) => {
            this.processError(observer, error);
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
        const postObservable = this.httpService.post(
          'authentication/update-logged-in-user-password',
          data
        );

        postObservable.subscribe({
          next: (response: AuthResponseDto) => {
            this.processAuthResponse(observer, response);
          },
          error: (error: any) => {
            this.processError(observer, error);
          },
          complete: () => {
            observer.complete();
          },
        });
      }
    );

    return newPasswordObservable;
  }

  requestPasswordCreationLink(
    data: RequestPasswordCreationLinkRequestDto
  ): Observable<boolean> {
    const requestPasswordCreationLinkObservable = new Observable(
      (observer: Subscriber<boolean>) => {
        const postObservable = this.httpService.post(
          'authentication/request-password-creation',
          data
        );

        postObservable.subscribe({
          next: (response: boolean) => {
            observer.next(response);
          },
          error: (error: any) => {
            this.processError(observer, error);
          },
          complete: () => {
            observer.complete();
          },
        });
      }
    );

    return requestPasswordCreationLinkObservable;
  }

  private processAuthResponse(
    observer: Subscriber<any>,
    response: AuthResponseDto
  ) {
    this.tokenService.setToken(response.data?.payload?.token);
    this.tokenService.setRefreshToken(response.data?.payload?.refreshToken!);
    observer.next(response);
  }

  private processError(observer: Subscriber<any>, error: any) {
    if (error.status == 0) {
      observer.error('Falha na requisição.'); // TODO: extrair texto
    } else if (error.error?.statusCode == HttpStatusCode.UnprocessableEntity) {
      observer.error(error);
    } else if (error.error?.statusCode && error.error.message) {
      observer.error(error);
    } else {
      observer.error(error.message);
    }
  }
}
