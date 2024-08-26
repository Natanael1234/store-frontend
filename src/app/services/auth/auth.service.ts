import { Injectable, OnInit, inject } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { RegisterRequestDto } from './dtos/register.request.dto';
import { HttpService } from '../http/http.service';
import { AuthResponseDto } from './dtos/auth.response.dto';
import { TokenService } from '../token/token.service';
import { HttpStatusCode } from '@angular/common/http';

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
            this.tokenService.setToken(response.data?.payload?.token);
            this.tokenService.setRefreshToken(
              response.data?.payload?.refreshToken!
            );
            observer.next(response);
          },
          error: (error: any) => {
            if (error.status == 0) {
              observer.error('Falha na requisição.'); // TODO: extrair texto
            } else if (
              error.error?.statusCode == HttpStatusCode.UnprocessableEntity
            ) {
              observer.error(error);
            } else if (error.error?.statusCode && error.error.message) {
              observer.error(error);
            } else {
              observer.error(error.message);
            }
          },
          complete: () => {
            observer.complete();
          },
        });
      }
    );

    return registerObservable;
  }
}
