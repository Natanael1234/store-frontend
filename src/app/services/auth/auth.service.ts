import { Injectable, OnInit, inject } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { RegisterRequestDto } from './dtos/register.request.dto';
import { HttpService } from '../http/http.service';
import { AuthResponseDto } from './dtos/auth.response.dto';
import { TokenService } from '../token/token.service';

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
          '/authentication/register',
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
            observer.error(error.message);
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
