import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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

@Injectable({ providedIn: 'root' })
export class UserService {
    private readonly httpService = inject(HttpService);
    private readonly tokenService = inject(TokenService); // TODO: ?

    getUsers(
        queryParams: FindUserRequestDTO,
    ): Observable<PaginatedResponseDTO<UserResponseDto, UserOrder>> {
        return this.httpService
            .get<PaginatedResponseDTO<UserResponseDto, UserOrder>>({
                path: AuthRequestRoutes.GET_USERS.url,
                queryParams: { query: JSON.stringify(queryParams) },
                authorization: true,
            })
            .pipe(catchError((error) => throwError(() => normalizeException(error))));
    }

    /**
     * @param identifier id or email
     */
    getUser(identifier: string): Observable<UserResponseDto> {
        return this.httpService
            .get<UserResponseDto>({
                path: `${AuthRequestRoutes.GET_USERS.url}/${identifier}`,
            })
            .pipe(catchError((error) => throwError(() => normalizeException(error))));
    }

    createUser(user: CreateUserRequestDto): Observable<UserResponseDto> {
        return this.httpService
            .post<UserResponseDto>({
                path: AuthRequestRoutes.POST_USER.url,
                data: user,
                authorization: true,
            })
            .pipe(catchError((error) => throwError(() => normalizeException(error))));
    }

    updateUser(userId: string, user: UpdateUserRequestDto): Observable<UserResponseDto> {
        return this.httpService
            .patch<UserResponseDto>({
                path: `${AuthRequestRoutes.PATCH_USER.url}/${userId}`,
                data: user,
                authorization: true,
            })
            .pipe(catchError((error) => throwError(() => normalizeException(error))));
    }
}
