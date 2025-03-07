import { Injectable, inject } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { HttpService } from '../http/http.service';
import { TokenService } from '../token/token.service';
import { FindUserRequestDTO } from './dtos/find-user.request/find-user.request.dto';
import { AuthRequestRoutes } from '../auth/request-routes/auth.request-routes';
import { UserResponseDto } from './dtos/user.response/user.response.dto';
import { normalizeException } from '../../utils/exception-normalizer/exception-normalizer';
import { PaginatedResponseDTO } from '../dtos/response/pagination/pagination.response.dto';
import { UserOrder } from './dtos/user-order/user-order.enum';
import { CreateUserRequestDto } from './dtos/user.request/create-user.request.dto';
import { UpdateUserRequestDto } from './dtos/user.request/update-user.request.dto';

@Injectable({ providedIn: 'root' })
export class UserService {
  httpService: HttpService = inject(HttpService);
  tokenService: TokenService = inject(TokenService);

  getUsers(
    queryParams: FindUserRequestDTO
  ): Observable<PaginatedResponseDTO<UserResponseDto, UserOrder>> {
    const path = AuthRequestRoutes.USERS.url;
    const observable = new Observable(
      (
        observer: Subscriber<PaginatedResponseDTO<UserResponseDto, UserOrder>>
      ) => {
        const postObservable = this.httpService.get({
          path,
          queryParams: { query: JSON.stringify(queryParams) },
          authorization: true,
        });
        this.processResponse(postObservable, observer);
      }
    );
    return observable;
  }

  /**
   *
   * @param identifier id or email
   * @returns
   */
  getUser(identifier: string): Observable<UserResponseDto> {
    const path = `${AuthRequestRoutes.POST_USER.url}\/${identifier}`;
    return new Observable((observer: Subscriber<UserResponseDto>) => {
      const postObservable = this.httpService.get({ path });
      this.processResponse(postObservable, observer);
    });
  }

  // TODO: test
  createUser(user: CreateUserRequestDto): Observable<UserResponseDto> {
    const path = AuthRequestRoutes.POST_USER.url;
    const data = user;
    return new Observable((observer: Subscriber<UserResponseDto>) => {
      const postObservable = this.httpService.post({ path, data });
      this.processResponse(postObservable, observer);
    });
  }

  // TODO: test
  updateUser(
    userId: string,
    user: UpdateUserRequestDto
  ): Observable<UserResponseDto> {
    const path = `${AuthRequestRoutes.PATCH_USER.url}\/${userId}`;
    const data = user;
    return new Observable((observer: Subscriber<UserResponseDto>) => {
      const postObservable = this.httpService.patch({
        path,
        data,
        authorization: true,
      });
      this.processResponse(postObservable, observer);
    });
  }

  private processResponse(
    postObservable: Observable<any>,
    observer: Subscriber<any>
  ) {
    postObservable.subscribe({
      next: (response: any) => {
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
}
