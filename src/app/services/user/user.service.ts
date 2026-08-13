import { Injectable, inject } from '@angular/core';
import { AuthRequestRoutes } from '@services/auth/request-routes/auth.request-routes';
import { PaginatedResponseDTO } from '@services/dtos/response/pagination/pagination.response.dto';
import { HttpService } from '@services/http/http.service';
import { TokenService } from '@services/token/token.service';
import { FindUserRequestDTO } from '@services/user/dtos/find-user.request/find-user.request.dto';
import { CreateUserRequestDto } from '@services/user/dtos/user.request/create-user.request.dto';
import { UpdateUserRequestDto } from '@services/user/dtos/user.request/update-user.request.dto';
import { UserResponseDto } from '@services/user/dtos/user.response/user.response.dto';
import { UserOrder } from '@services/user/enums/user-order/user-order.enum';
import { normalizeException } from '@utils/exception-normalizer/exception-normalizer';
import { Observable, Subscriber } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    httpService: HttpService = inject(HttpService);
    tokenService: TokenService = inject(TokenService);

    getUsers(
        queryParams: FindUserRequestDTO,
    ): Observable<PaginatedResponseDTO<UserResponseDto, UserOrder>> {
        const path = AuthRequestRoutes.GET_USERS.url;
        const observable = new Observable(
            (
                observer: Subscriber<
                    PaginatedResponseDTO<UserResponseDto, UserOrder>
                >,
            ) => {
                const postObservable = this.httpService.get({
                    path,
                    queryParams: { query: JSON.stringify(queryParams) },
                    authorization: true,
                });
                this.processResponse(postObservable, observer);
            },
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
        user: UpdateUserRequestDto,
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
        observer: Subscriber<any>,
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
