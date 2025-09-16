import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { HttpService } from '../http/http.service';
import {
    testCreateMockedTokenService,
    testTokenServiceCalls,
} from '../token/test-token-service.utils';
import { TokenService } from '../token/token.service';
import { Role } from '../user/dtos/role/role.enum';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dtos/auth.response.dto';
import { EditOwnProfileRequestDto } from './dtos/edit-own-profile.request.dto';
import { LoginRequestDto } from './dtos/login.request.dto';
import { NewPasswordRequestDto } from './dtos/new-password.request.dto';
import { RegisterRequestDto } from './dtos/register.request.dto';
import { RequestPasswordChangeLinkRequestDto } from './dtos/request-password-creation-link.request.dto';
import { UpdateLoggedInUserPasswordRequestDto } from './dtos/update-logged-in-user-password.request.dto';
import { AuthRequestRoutes } from './request-routes/auth.request-routes';

/** mocks JWT token */
const SECRET_KEY = 'SECRET_KEY';
function base64Encode(str: string): string {
    return btoa(str)
        .replace(/=/g, '') // remove padding
        .replace(/\+/g, '-') // substitui + por -
        .replace(/\//g, '_'); // substitui / por _
}
async function createSignature(
    header: string,
    payload: string,
): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(`${header}.${payload}`);
    const key = await crypto.subtle.importKey(
        'raw',
        encoder.encode(SECRET_KEY),
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign'],
    );
    const signature = await crypto.subtle.sign('HMAC', key, data);
    return base64Encode(String.fromCharCode(...new Uint8Array(signature)));
}
async function generateToken(payload: object): Promise<string> {
    const header = base64Encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const encodedPayload = base64Encode(JSON.stringify(payload));

    const signature = await createSignature(header, encodedPayload);
    return `${header}.${encodedPayload}.${signature}`;
}

const EXPIRED_TEST_ACCESS_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDY5ODcxMjEsImV4cCI6MTcwNzA3MzUyMSwic3ViIjoiODkxZGIzMWUtZGZiNS00MmVkLWI5MTItNDhiOTg0NjNiMDA0In0.LaW-Z0DkU5ZheRtst0mvZ3WtMgMmMeawJVke9qtCVyE';
const EXPIRED_TEST_REFRESH_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDY5ODcxMjEsImV4cCI6NDI5ODk4NzEyMSwic3ViIjoiODkxZGIzMWUtZGZiNS00MmVkLWI5MTItNDhiOTg0NjNiMDA0IiwianRpIjoiMTI4In0.bJTClITMvD5NCDt5DjTmxn3DIjFOabEvsCvnK795VXU';

let mockAuthResponse: AuthResponseDto = {
    status: 'success',
    data: {
        user: {
            id: '891db31e-dfb5-42ed-b912-48b98463b004',
            name: 'John Doe',
            email: 'john@example.com',
            roles: [Role.user],
            active: true,
            created: '2024-02-03T19:05:21.689Z',
            updated: '2024-02-03T19:05:21.689Z',
            deletedAt: null,
        },
        payload: {
            type: 'bearer',
            token: EXPIRED_TEST_ACCESS_TOKEN,
            refreshToken: EXPIRED_TEST_REFRESH_TOKEN,
        },
    },
};

describe('AuthService', () => {
    let authService: AuthService;
    let mockedHttpService: any;
    let mockedTokenService: any;

    beforeEach(async () => {
        mockedTokenService = testCreateMockedTokenService();

        mockedHttpService = jasmine.createSpyObj('HttpService', ['post']);

        TestBed.configureTestingModule({
            providers: [
                { provide: TokenService, useValue: mockedTokenService },
                { provide: HttpService, useValue: mockedHttpService },
                AuthService,
            ],
        });

        authService = TestBed.inject(AuthService);
    });

    it('should be created', () => {
        expect(authService).toBeTruthy();
    });

    xdescribe('register', () => {
        it('should call register method', async () => {
            const authesponse: RegisterRequestDto = {
                name: 'User 1',
                email: 'user1@email.com',
                password: 'Password123$',
                repeatPassword: 'Password123$',
                acceptTerms: true,
            };

            mockedHttpService.post.and.returnValue(of(mockAuthResponse));
            mockedTokenService.setAccessToken.and.returnValue(null);
            mockedTokenService.setRefreshToken.and.returnValue(null);

            authService.register(authesponse).subscribe({
                next: (registerResponse: AuthResponseDto) => {
                    expect(mockedHttpService.post)
                        .withContext(
                            `httpService.${AuthRequestRoutes.REGISTER.method} "${AuthRequestRoutes.REGISTER.url}" call`,
                        )
                        .toHaveBeenCalledOnceWith(
                            AuthRequestRoutes.REGISTER.url,
                            authesponse,
                        );

                    expect(registerResponse)
                        .withContext(
                            `httpService.${AuthRequestRoutes.EDIT_OWN_PROFILE.method}" "${AuthRequestRoutes.REGISTER.url}" response`,
                        )
                        .toEqual(mockAuthResponse);

                    testTokenServiceCalls(
                        {
                            setAccessToken: [
                                mockAuthResponse.data.payload.token,
                            ],
                            setRefreshToken: [
                                mockAuthResponse.data.payload.refreshToken,
                            ],
                        },
                        mockedTokenService,
                    );
                },
                error: (error: HttpErrorResponse) => {
                    expect(true).withContext('Error not expected.').toBeFalsy();
                },
            });
        });

        it('should fail calling register method', async () => {
            mockedHttpService.post.and.returnValue(
                throwError(
                    () =>
                        new HttpErrorResponse({
                            error: 'Simulated error',
                            status: HttpStatusCode.Conflict,
                        }),
                ),
            );

            const registerDto: RegisterRequestDto = {
                name: 'Usuário Teste',
                email: 'usuario@teste.com',
                password: 'senha',
                repeatPassword: 'senha',
                acceptTerms: true,
            };

            authService.register(registerDto).subscribe({
                error: (err) => {
                    expect(err).toEqual(
                        new HttpErrorResponse({
                            error: 'Simulated error',
                            status: HttpStatusCode.Conflict,
                        }),
                    );

                    testTokenServiceCalls({}, mockedTokenService);
                },
                complete: () => {
                    expect(true).withContext('not reachable code').toBeFalsy();
                },
            });
        });
    });

    describe('login', () => {
        it('should call login method', () => {
            const loginData: LoginRequestDto = {
                email: 'User 1',
                password: 'Password123$',
            };

            mockedHttpService.post.and.returnValue(of(mockAuthResponse));
            mockedTokenService.setAccessToken.and.returnValue(null);
            mockedTokenService.setRefreshToken.and.returnValue(null);

            authService.login(loginData).subscribe({
                next: (authesponse: AuthResponseDto) => {
                    expect(mockedHttpService.post)
                        .withContext(
                            `httpService."${AuthRequestRoutes.LOGIN.method} "${AuthRequestRoutes.LOGIN.url}" call`,
                        )
                        .toHaveBeenCalledOnceWith({
                            path: AuthRequestRoutes.LOGIN.url,
                            data: loginData,
                        });

                    expect(authesponse)
                        .withContext(
                            `httpService."${AuthRequestRoutes.LOGIN.method} "${AuthRequestRoutes.LOGIN.url}" response`,
                        )
                        .toEqual(mockAuthResponse);

                    testTokenServiceCalls(
                        {
                            setAccessToken: [
                                mockAuthResponse.data.payload.token,
                            ],
                            setRefreshToken: [
                                mockAuthResponse.data.payload.refreshToken,
                            ],
                        },
                        mockedTokenService,
                    );
                },
                error: (error: HttpErrorResponse) => {
                    expect(true).withContext('Error not expected.').toBeFalsy();
                },
            });
        });

        it('should fail calling login method', () => {
            mockedHttpService.post.and.returnValue(
                throwError(
                    () =>
                        new HttpErrorResponse({
                            error: 'Simulated error',
                            status: HttpStatusCode.Unauthorized,
                        }),
                ),
            );

            const loginDto: LoginRequestDto = {
                email: 'usuario@teste.com',
                password: 'senha',
            };

            authService.login(loginDto).subscribe({
                error: (err) => {
                    expect(err).toEqual(
                        new HttpErrorResponse({
                            error: 'Simulated error',
                            status: HttpStatusCode.Unauthorized,
                        }),
                    );

                    testTokenServiceCalls({}, mockedTokenService);
                },
                complete: () => {
                    expect(true).withContext('not reachable code').toBeFalsy();
                },
            });
        });
    });

    describe('editOwnProfile', () => {
        it('should call editOwnProfile method', () => {
            const profileData: EditOwnProfileRequestDto = {
                name: 'User 1',
            };

            mockedHttpService.post.and.returnValue(of(null));
            mockedTokenService.setAccessToken.and.returnValue(null);
            mockedTokenService.setRefreshToken.and.returnValue(null);

            authService.editOwnProfile(profileData).subscribe({
                next: (authesponse: true) => {
                    expect(mockedHttpService.post)
                        .withContext(
                            `httpService.${AuthRequestRoutes.EDIT_OWN_PROFILE.method}" "${AuthRequestRoutes.EDIT_OWN_PROFILE.url}" call`,
                        )
                        .toHaveBeenCalledOnceWith({
                            path: AuthRequestRoutes.EDIT_OWN_PROFILE.url,
                            data: profileData,
                        });

                    expect(authesponse)
                        .withContext(
                            `httpService.${AuthRequestRoutes.EDIT_OWN_PROFILE.method}" "${AuthRequestRoutes.EDIT_OWN_PROFILE.url}" response`,
                        )
                        .toEqual(true);

                    testTokenServiceCalls({}, mockedTokenService);
                },
                error: (error: HttpErrorResponse) => {
                    expect(true).withContext('Error not expected.').toBeFalsy();
                },
            });
        });

        it('should fail calling editOwnProfile method', () => {
            mockedHttpService.post.and.returnValue(
                throwError(
                    () =>
                        new HttpErrorResponse({
                            error: 'Simulated error',
                            status: HttpStatusCode.Unauthorized,
                        }),
                ),
            );

            const profileDto: EditOwnProfileRequestDto = {
                name: 'User 1',
            };

            authService.editOwnProfile(profileDto).subscribe({
                error: (err: any) => {
                    expect(err).toEqual(
                        new HttpErrorResponse({
                            error: 'Simulated error',
                            status: HttpStatusCode.Unauthorized,
                        }),
                    );

                    testTokenServiceCalls({}, mockedTokenService);
                },
                complete: () => {
                    expect(true).withContext('not reachable code').toBeFalsy();
                },
            });
        });
    });

    describe('createNewPassword', () => {
        it('should call createNewPassword method', async () => {
            const createNewPasswordData: NewPasswordRequestDto = {
                hash: 'User 1',
                password: 'Password123$',
                repeatPassword: 'Password123$',
            };

            mockedHttpService.post.and.returnValue(of(mockAuthResponse));
            mockedTokenService.setAccessToken.and.returnValue(null);
            mockedTokenService.setRefreshToken.and.returnValue(null);

            authService.createNewPassword(createNewPasswordData).subscribe({
                next: (authesponse: AuthResponseDto) => {
                    expect(mockedHttpService.post)
                        .withContext(
                            `httpService.${AuthRequestRoutes.NEW_PASSWORD.method} "${AuthRequestRoutes.NEW_PASSWORD.url}" call`,
                        )
                        .toHaveBeenCalledOnceWith({
                            path: AuthRequestRoutes.NEW_PASSWORD.url,
                            data: createNewPasswordData,
                        });

                    expect(authesponse)
                        .withContext(
                            `httpService.${AuthRequestRoutes.NEW_PASSWORD}" "${AuthRequestRoutes.NEW_PASSWORD}" response`,
                        )
                        .toEqual(mockAuthResponse);

                    testTokenServiceCalls(
                        {
                            setAccessToken: [
                                mockAuthResponse.data.payload.token,
                            ],
                            setRefreshToken: [
                                mockAuthResponse.data.payload.refreshToken,
                            ],
                        },
                        mockedTokenService,
                    );
                },
                error: (error: HttpErrorResponse) => {
                    expect(true).withContext('Error not expected.').toBeFalsy();
                },
            });
        });

        it('should fail calling createNewPassword method', async () => {
            mockedHttpService.post.and.returnValue(
                throwError(
                    () =>
                        new HttpErrorResponse({
                            error: 'Simulated error',
                            status: HttpStatusCode.BadRequest,
                        }),
                ),
            );

            const newPasswordDto: NewPasswordRequestDto = {
                hash: 'SOME_HASH',
                password: 'senha',
                repeatPassword: 'senha',
            };

            authService.createNewPassword(newPasswordDto).subscribe({
                error: (err) => {
                    expect(err).toEqual(
                        new HttpErrorResponse({
                            error: 'Simulated error',
                            status: HttpStatusCode.BadRequest,
                        }),
                    );

                    testTokenServiceCalls({}, mockedTokenService);
                },
                complete: () => {
                    expect(true).withContext('not reachable code').toBeFalsy();
                },
            });
        });
    });

    describe('requestPasswordChangeLink', () => {
        it('should call requestPasswordChangeLink method', async () => {
            const requestPasswordChangeLinkRequestDto: RequestPasswordChangeLinkRequestDto =
                { email: 'user1@email.com' };

            mockedHttpService.post.and.returnValue(of(true));

            authService
                .requestPasswordChangeLink(requestPasswordChangeLinkRequestDto)
                .subscribe({
                    next: (registerResponse: boolean) => {
                        expect(mockedHttpService.post)
                            .withContext(
                                `httpService.${AuthRequestRoutes.REQUEST_PASSWORD_CREATION.method} "${AuthRequestRoutes.REQUEST_PASSWORD_CREATION.url}" call`,
                            )
                            .toHaveBeenCalledOnceWith({
                                path: AuthRequestRoutes
                                    .REQUEST_PASSWORD_CREATION.url,
                                data: requestPasswordChangeLinkRequestDto,
                            });

                        expect(registerResponse)
                            .withContext(
                                `httpService."${AuthRequestRoutes.REQUEST_PASSWORD_CREATION.method} "${AuthRequestRoutes.REQUEST_PASSWORD_CREATION.url}" response`,
                            )
                            .toBeTrue();

                        testTokenServiceCalls({}, mockedTokenService);
                    },
                    error: (error: HttpErrorResponse) => {
                        expect(true)
                            .withContext('Error not expected.')
                            .toBeFalsy();
                    },
                });
        });

        it('should fail calling requestPasswordChangeLink method', async () => {
            mockedHttpService.post.and.returnValue(
                throwError(
                    () =>
                        new HttpErrorResponse({
                            error: 'Simulated error',
                            status: HttpStatusCode.Unauthorized,
                        }),
                ),
            );

            const requestPasswordChangeLinkDto: RequestPasswordChangeLinkRequestDto =
                { email: 'usuario@teste.com' };

            authService
                .requestPasswordChangeLink(requestPasswordChangeLinkDto)
                .subscribe({
                    error: (err) => {
                        expect(err).toEqual(
                            new HttpErrorResponse({
                                error: 'Simulated error',
                                status: HttpStatusCode.Unauthorized,
                            }),
                        );

                        testTokenServiceCalls({}, mockedTokenService);
                    },
                    complete: () => {
                        expect(true)
                            .withContext('not reachable code')
                            .toBeFalsy();
                    },
                });
        });
    });

    describe('updateLoggedInUserPassword', () => {
        it('should call updateLoggedInUserPassword method', async () => {
            const updateLogedInUserPasswordData: UpdateLoggedInUserPasswordRequestDto =
                { password: 'Password123$', repeatPassword: 'Password123$' };

            mockedHttpService.post.and.returnValue(of(mockAuthResponse));
            mockedTokenService.setAccessToken.and.returnValue(null);
            mockedTokenService.getAccessToken.and.returnValue(
                mockAuthResponse.data.payload.token,
            );
            mockedTokenService.setRefreshToken.and.returnValue(null);

            authService
                .updateLoggedInUserPassword(updateLogedInUserPasswordData)
                .subscribe({
                    next: (authesponse: AuthResponseDto) => {
                        expect(mockedHttpService.post)
                            .withContext(
                                `httpService."${AuthRequestRoutes.UPDATE_LOGGED_IN_USER_PASSWORD.method}" "${AuthRequestRoutes.UPDATE_LOGGED_IN_USER_PASSWORD.url}" call`,
                            )
                            .toHaveBeenCalledOnceWith({
                                path: AuthRequestRoutes
                                    .UPDATE_LOGGED_IN_USER_PASSWORD.url,
                                data: updateLogedInUserPasswordData,
                            });

                        expect(authesponse)
                            .withContext(
                                `httpService.${AuthRequestRoutes.UPDATE_LOGGED_IN_USER_PASSWORD.method} "${AuthRequestRoutes.UPDATE_LOGGED_IN_USER_PASSWORD.url}" response`,
                            )
                            .toEqual(mockAuthResponse);

                        testTokenServiceCalls(
                            {
                                setAccessToken: [
                                    mockAuthResponse.data.payload.token,
                                ],
                                setRefreshToken: [
                                    mockAuthResponse.data.payload.refreshToken,
                                ],
                            },
                            mockedTokenService,
                        );
                    },
                    error: (error: HttpErrorResponse) => {
                        expect(true)
                            .withContext('Error not expected.')
                            .toBeFalsy();
                    },
                });
        });

        it('should fail calling createNewPassword method', async () => {
            new HttpErrorResponse({
                error: 'Simulated error',
                status: HttpStatusCode.Unauthorized,
            });
            mockedHttpService.post.and.returnValue(
                throwError(
                    () =>
                        new HttpErrorResponse({
                            error: 'Simulated error',
                            status: HttpStatusCode.Unauthorized,
                        }),
                ),
            );

            const updateLoggedInUserPasswordDto: UpdateLoggedInUserPasswordRequestDto =
                { password: 'senha', repeatPassword: 'senha' };

            authService
                .updateLoggedInUserPassword(updateLoggedInUserPasswordDto)
                .subscribe({
                    error: (err) => {
                        expect(err).toEqual(
                            new HttpErrorResponse({
                                error: 'Simulated error',
                                status: HttpStatusCode.Unauthorized,
                            }),
                        );

                        testTokenServiceCalls({}, mockedTokenService);
                    },
                    complete: () => {
                        expect(true)
                            .withContext('not reachable code')
                            .toBeFalsy();
                    },
                });
        });
    });

    describe('refreshToken', () => {
        it('should call refreshToken method and receive access token', async () => {
            const payload = {
                id: '891db31e-dfb5-42ed-b912-48b98463b004',
                name: 'John Doe',
                email: 'john@example.com',
                roles: [Role.user],
                active: true,
                created: '2024-02-03T19:05:21.689Z',
                updated: '2024-02-03T19:05:21.689Z',
                deletedAt: null,
                exp: Math.floor(Date.now() / 1000) + 60 * 6,
            };
            const accessToken = await generateToken(payload);
            const refreshToken = await generateToken(payload);
            let mockAuthResponse: AuthResponseDto = {
                status: 'success',
                data: {
                    user: {
                        id: '891db31e-dfb5-42ed-b912-48b98463b004',
                        name: 'John Doe',
                        email: 'john@example.com',
                        roles: [Role.user],
                        active: true,
                        created: '2024-02-03T19:05:21.689Z',
                        updated: '2024-02-03T19:05:21.689Z',
                        deletedAt: null,
                    },
                    payload: {
                        type: 'bearer',
                        token: accessToken,
                        refreshToken,
                    },
                },
            };

            mockedHttpService.post.and.returnValue(of(mockAuthResponse));
            mockedTokenService.setAccessToken.and.returnValue(null);
            mockedTokenService.setRefreshToken.and.returnValue(null);
            mockedTokenService.getAccessToken.and.returnValue(null);
            mockedTokenService.getRefreshToken.and.returnValue(refreshToken);
            mockedTokenService.clearTokens.and.returnValue(null);

            authService.refreshToken().subscribe({
                next: (authesponse: string | null) => {
                    expect(mockedHttpService.post)
                        .withContext(
                            `httpService.${AuthRequestRoutes.REFRESH.method} "${AuthRequestRoutes.REFRESH.url}" call`,
                        )
                        .toHaveBeenCalledOnceWith({
                            path: AuthRequestRoutes.REFRESH.url,
                            data: {
                                refreshToken:
                                    mockAuthResponse.data.payload.refreshToken,
                            },
                        });

                    expect(authesponse)
                        .withContext(
                            `httpService.${AuthRequestRoutes.REFRESH.method} "${AuthRequestRoutes.REFRESH.url}" response`,
                        )
                        .toEqual(accessToken);

                    expect(mockedTokenService.getAccessToken)
                        .withContext('tokenService.getAccessToken call')
                        .not.toHaveBeenCalled();

                    expect(mockedTokenService.getRefreshToken)
                        .withContext('tokenService.getRefreshToken call')
                        .toHaveBeenCalledOnceWith();

                    expect(mockedTokenService.setAccessToken)
                        .withContext('tokenService.setAccessToken call')
                        .toHaveBeenCalledOnceWith(
                            mockAuthResponse.data.payload.token,
                        );

                    expect(mockedTokenService.setRefreshToken)
                        .withContext('tokenService.setRefreshToken call')
                        .not.toHaveBeenCalled();

                    expect(mockedTokenService.clearTokens)
                        .withContext('tokenService.clearTokens call')
                        .not.toHaveBeenCalledOnceWith();

                    testTokenServiceCalls(
                        {
                            getRefreshToken: 1,
                            setAccessToken: [
                                mockAuthResponse.data.payload.token,
                            ],
                        },
                        mockedTokenService,
                    );
                },
                error: (error: HttpErrorResponse) => {
                    expect(true).withContext('Error not expected.').toBeFalsy();
                },
            });
        });

        it('should call refreshToken method and receive null istead of access token when both token and refresh token are not defined', async () => {
            const payload = {
                id: '891db31e-dfb5-42ed-b912-48b98463b004',
                name: 'John Doe',
                email: 'john@example.com',
                roles: [Role.user],
                active: true,
                created: '2024-02-03T19:05:21.689Z',
                updated: '2024-02-03T19:05:21.689Z',
                deletedAt: null,
                exp: Math.floor(Date.now() / 1000) + 60 * 6,
            };
            const accessToken = await generateToken(payload);
            const refreshToken = await generateToken(payload);
            let mockAuthResponse: AuthResponseDto = {
                status: 'success',
                data: {
                    user: {
                        id: '891db31e-dfb5-42ed-b912-48b98463b004',
                        name: 'John Doe',
                        email: 'john@example.com',
                        roles: [Role.user],
                        active: true,
                        created: '2024-02-03T19:05:21.689Z',
                        updated: '2024-02-03T19:05:21.689Z',
                        deletedAt: null,
                    },
                    payload: {
                        type: 'bearer',
                        token: accessToken,
                        refreshToken,
                    },
                },
            };

            mockedHttpService.post.and.returnValue(of(mockAuthResponse));

            mockedTokenService.setAccessToken.and.returnValue(null);
            mockedTokenService.setRefreshToken.and.returnValue(null);
            mockedTokenService.getAccessToken.and.returnValue(null);
            mockedTokenService.getRefreshToken.and.returnValue(null);
            mockedTokenService.clearTokens.and.returnValue(null);

            authService.refreshToken().subscribe({
                next: (authesponse: string | null) => {
                    expect(mockedHttpService.post)
                        .withContext(
                            `httpService.${AuthRequestRoutes.REFRESH.method} "${AuthRequestRoutes.REFRESH.url}" call`,
                        )
                        .not.toHaveBeenCalled();

                    expect(mockedTokenService.getAccessToken)
                        .withContext('tokenService.getAccessToken call')
                        .not.toHaveBeenCalled();

                    expect(mockedTokenService.getRefreshToken)
                        .withContext('tokenService.getRefreshToken call')
                        .toHaveBeenCalledOnceWith();

                    expect(mockedTokenService.setAccessToken)
                        .withContext('tokenService.setAccessToken call')
                        .not.toHaveBeenCalledOnceWith(
                            mockAuthResponse.data.payload.token,
                        );

                    expect(mockedTokenService.setRefreshToken)
                        .withContext('tokenService.setRefreshToken call')
                        .not.toHaveBeenCalled();

                    expect(mockedTokenService.clearTokens)
                        .withContext('tokenService.clearTokens call')
                        .toHaveBeenCalledOnceWith();
                },
                error: (error: HttpErrorResponse) => {
                    expect(true)
                        .withContext('not reachable code (complete)')
                        .toBeFalsy();
                },
            });
        });

        it('should return false when calling refreshToken method and receiving a 401 Unauthorized error from http request', async () => {
            const payload = {
                id: '891db31e-dfb5-42ed-b912-48b98463b004',
                name: 'John Doe',
                email: 'john@example.com',
                roles: [Role.user],
                active: true,
                created: '2024-02-03T19:05:21.689Z',
                updated: '2024-02-03T19:05:21.689Z',
                deletedAt: null,
                exp: Math.floor(Date.now() / 1000) + 60 * 6,
            };
            const refreshToken = await generateToken(payload);

            mockedHttpService.post.and.returnValue(
                throwError(
                    () =>
                        new HttpErrorResponse({
                            error: 'Simulated error',
                            status: HttpStatusCode.Unauthorized,
                        }),
                ),
            );

            mockedTokenService.getAccessToken.and.returnValue(null);
            mockedTokenService.getRefreshToken.and.returnValue(refreshToken);
            mockedTokenService.setAccessToken.and.returnValue(null);
            mockedTokenService.setRefreshToken.and.returnValue(null);
            mockedTokenService.clearTokens.and.returnValue(null);

            authService.refreshToken().subscribe({
                next: (r) => {
                    expect(mockedTokenService.getAccessToken)
                        .withContext('tokenService.getAccessToken call')
                        .not.toHaveBeenCalled();
                    expect(mockedTokenService.getRefreshToken)
                        .withContext('tokenService.getRefreshToken call')
                        .toHaveBeenCalledOnceWith();
                    expect(mockedTokenService.setAccessToken)
                        .withContext('tokenService.setAccessToken call')
                        .not.toHaveBeenCalledOnceWith(
                            mockAuthResponse.data.payload.token,
                        );
                    expect(mockedTokenService.setRefreshToken)
                        .withContext('tokenService.setRefreshToken call')
                        .not.toHaveBeenCalled();
                    expect(mockedTokenService.clearTokens)
                        .withContext('tokenService.clearTokens call')
                        .toHaveBeenCalledOnceWith();
                },
                error: (err) => {
                    expect(true)
                        .withContext('not reachable code (error)')
                        .toBeFalsy();
                },
                complete: () => {
                    expect(true)
                        .withContext('not reachable code (complete)')
                        .toBeFalsy();
                },
            });
        });

        it('should fail calling refreshToken method when receives a non 401 Unauthorized error from http request', async () => {
            const payload = {
                id: '891db31e-dfb5-42ed-b912-48b98463b004',
                name: 'John Doe',
                email: 'john@example.com',
                roles: [Role.user],
                active: true,
                created: '2024-02-03T19:05:21.689Z',
                updated: '2024-02-03T19:05:21.689Z',
                deletedAt: null,
                exp: Math.floor(Date.now() / 1000) + 60 * 6,
            };
            const refreshToken = await generateToken(payload);

            mockedHttpService.post.and.returnValue(
                throwError(
                    () =>
                        new HttpErrorResponse({
                            error: 'Simulated error',
                            status: HttpStatusCode.Forbidden,
                        }),
                ),
            );
            mockedTokenService.setAccessToken.and.returnValue(null);
            mockedTokenService.setRefreshToken.and.returnValue(null);
            mockedTokenService.getAccessToken.and.returnValue(null);
            mockedTokenService.getRefreshToken.and.returnValue(refreshToken);
            mockedTokenService.clearTokens.and.returnValue(null);

            authService.refreshToken().subscribe({
                next: (r) => {
                    expect(true)
                        .withContext('not reachable code (next)')
                        .toBeFalsy();
                },
                error: (err) => {
                    expect(err).toBeDefined();
                    expect(err.error).toEqual('Simulated error');
                    expect(err.cause).not.toBeDefined();

                    expect(mockedHttpService.post)
                        .withContext(
                            `httpService."${AuthRequestRoutes.REFRESH.method} "${AuthRequestRoutes.REFRESH.url}" call`,
                        )
                        .toHaveBeenCalledOnceWith({
                            path: AuthRequestRoutes.REFRESH.url,
                            data: { refreshToken },
                        });

                    expect(mockedTokenService.getAccessToken)
                        .withContext('tokenService.getAccessToken call')
                        .not.toHaveBeenCalled();

                    expect(mockedTokenService.getRefreshToken)
                        .withContext('tokenService.getRefreshToken call')
                        .toHaveBeenCalledOnceWith();

                    expect(mockedTokenService.setAccessToken)
                        .withContext('tokenService.setAccessToken call')
                        .not.toHaveBeenCalledOnceWith(
                            mockAuthResponse.data.payload.token,
                        );

                    expect(mockedTokenService.setRefreshToken)
                        .withContext('tokenService.setRefreshToken call')
                        .not.toHaveBeenCalled();

                    expect(mockedTokenService.clearTokens)
                        .withContext('tokenService.clearTokens call')
                        .not.toHaveBeenCalled();
                },
                complete: () => {
                    expect(true)
                        .withContext('not reachable code (complete)')
                        .toBeFalsy();
                },
            });
        });
    });

    // TODO:
    xdescribe('isAuthenticated', () => {
        xit('should return false when access token is not defined and refresh token is not defined', async () => {});

        xit('should return false when access token is not defined and refresh token is expired', async () => {});

        xit('should return true when access token is not defined and refresh token is valid', async () => {});

        xit('should return false when access token is expired and refresh token is not defined', async () => {});

        xit('should return false when access token is expired and refresh token is expired', async () => {});

        xit('should return true when access token is expired and refresh token is valid', async () => {});

        xit('should return true when access token is valid and refresh token is not defined', async () => {});

        xit('should return true when access token is valid and refresh token is expired', async () => {});

        xit('should return true when access token is valid and refresh token is valid', async () => {});

        xit('should handle unauthorized error', async () => {});

        xit('should return true when the error is other than unauthorized', async () => {});

        // TODO: remove
        xit('should fail calling isAuthenticated method', async () => {});
    });
});
