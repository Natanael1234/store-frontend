import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '@services/auth/auth.service';
import { AuthResponseDto } from '@services/auth/dtos/auth.response.dto';
import { EditOwnProfileRequestDto } from '@services/auth/dtos/edit-own-profile.request.dto';
import { LoginRequestDto } from '@services/auth/dtos/login.request.dto';
import { NewPasswordRequestDto } from '@services/auth/dtos/new-password.request.dto';
import { RegisterRequestDto } from '@services/auth/dtos/register.request.dto';
import { RequestPasswordChangeLinkRequestDto } from '@services/auth/dtos/request-password-creation-link.request.dto';
import { UpdateLoggedInUserPasswordRequestDto } from '@services/auth/dtos/update-logged-in-user-password.request.dto';
import { AuthRequestRoutes } from '@services/auth/request-routes/auth.request-routes';
import { HttpService } from '@services/http/http.service';
import {
    testCreateMockedTokenService,
    testTokenServiceCalls,
} from '@services/token/test-token-service.utils';
import { TokenService } from '@services/token/token.service';
import { Role } from '@services/user/dtos/role/role.enum';
import { firstValueFrom, of, throwError } from 'rxjs';
import { beforeEach, describe, expect, it, vi, type Mocked } from 'vitest';

/** mocks JWT token */
const SECRET_KEY = 'SECRET_KEY';
function base64Encode(str: string): string {
    return btoa(str)
        .replace(/=/g, '') // remove padding
        .replace(/\+/g, '-') // substitui + por -
        .replace(/\//g, '_'); // substitui / por _
}
async function createSignature(header: string, payload: string): Promise<string> {
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
            name: 'John Williams',
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

describe('AuthService.', () => {
    let authService: AuthService;
    let mockedHttpService: any;
    let mockedTokenService: any;

    beforeEach(async () => {
        mockedTokenService = testCreateMockedTokenService();

        mockedHttpService = {
            post: vi.fn(),
            put: vi.fn(),
            get: vi.fn(),
            delete: vi.fn(),
            patch: vi.fn(),
        } as unknown as Mocked<HttpService>;

        // jasmine.createSpyObj('HttpService', ['post']);

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

    describe('register', () => {
        it('should call register method and process tokens', () => {
            return new Promise<void>((resolve, reject) => {
                const registerRequest: RegisterRequestDto = {
                    name: 'User 1',
                    email: 'user1@email.com',
                    password: 'Password123$',
                    repeatPassword: 'Password123$',
                    acceptTerms: true,
                };

                mockedHttpService.post.mockReturnValue(of(mockAuthResponse));

                authService.register(registerRequest).subscribe({
                    next: (registerResponse: AuthResponseDto) => {
                        try {
                            expect(mockedHttpService.post).toHaveBeenCalledOnce();
                            expect(mockedHttpService.post).toHaveBeenCalledWith({
                                path: AuthRequestRoutes.REGISTER.url,
                                data: registerRequest,
                            });
                            expect(registerResponse).toEqual(mockAuthResponse);
                            testTokenServiceCalls(
                                {
                                    setAccessToken: [mockAuthResponse.data.payload.token],
                                    setRefreshToken: [mockAuthResponse.data.payload.refreshToken],
                                },
                                mockedTokenService,
                            );
                            resolve();
                        } catch (err) {
                            reject(err);
                        }
                    },
                    error: (error) => {
                        reject(new Error(`Unexpected error emissions: ${error}`));
                    },
                });
            });
        });

        it('should handle registration failure gracefully', () => {
            return new Promise<void>((resolve, reject) => {
                const simulatedError = new HttpErrorResponse({
                    error: 'Simulated error',
                    status: HttpStatusCode.Conflict,
                });

                mockedHttpService.post.mockReturnValue(throwError(() => simulatedError));

                const registerDto: RegisterRequestDto = {
                    name: 'Usuário Teste',
                    email: 'usuario@teste.com',
                    password: 'senha',
                    repeatPassword: 'senha',
                    acceptTerms: true,
                };

                authService.register(registerDto).subscribe({
                    next: () => {
                        reject(
                            new Error(
                                'Expected observable to throw error, but received success payload instead.',
                            ),
                        );
                    },
                    error: (err) => {
                        try {
                            expect(err).toEqual(simulatedError);
                            testTokenServiceCalls({}, mockedTokenService);
                            resolve();
                        } catch (assertionError) {
                            reject(assertionError);
                        }
                    },
                });
            });
        });
    });

    describe('login', () => {
        it('should call login method', async () => {
            const loginData: LoginRequestDto = { email: 'User 1', password: 'Password123$' };

            mockedHttpService.post.mockReturnValue(of(mockAuthResponse));

            const authesponse = await firstValueFrom(authService.login(loginData));

            expect(mockedHttpService.post).toHaveBeenCalledExactlyOnceWith({
                path: AuthRequestRoutes.LOGIN.url,
                data: loginData,
            });

            expect(authesponse).toEqual(mockAuthResponse);

            testTokenServiceCalls(
                {
                    setAccessToken: [mockAuthResponse.data.payload.token],
                    setRefreshToken: [mockAuthResponse.data.payload.refreshToken],
                },
                mockedTokenService,
            );
        });

        it('should fail calling login method', async () => {
            const simulatedError = new HttpErrorResponse({
                error: 'Simulated error',
                status: HttpStatusCode.Unauthorized,
            });

            mockedHttpService.post.mockReturnValue(throwError(() => simulatedError));

            const loginDto: LoginRequestDto = {
                email: 'usuario@teste.com',
                password: 'senha',
            };

            await expect(firstValueFrom(authService.login(loginDto))).rejects.toEqual(
                simulatedError,
            );

            testTokenServiceCalls({}, mockedTokenService);
        });
    });

    describe('editOwnProfile', () => {
        it('should call editOwnProfile method and return true', async () => {
            const profileData: EditOwnProfileRequestDto = { name: 'User 1' };

            mockedHttpService.post.mockReturnValue(of(null));

            const response = await firstValueFrom(authService.editOwnProfile(profileData));

            expect(mockedHttpService.post).toHaveBeenCalledOnce();
            expect(mockedHttpService.post).toHaveBeenCalledWith({
                path: AuthRequestRoutes.EDIT_OWN_PROFILE.url,
                data: profileData,
            });

            expect(response).toBe(true);

            testTokenServiceCalls({}, mockedTokenService);
        });

        it('should fail calling editOwnProfile method', async () => {
            const simulatedError = new HttpErrorResponse({
                error: 'Simulated error',
                status: HttpStatusCode.Unauthorized,
            });

            mockedHttpService.post.mockReturnValue(throwError(() => simulatedError));

            const profileDto: EditOwnProfileRequestDto = {
                name: 'User 1',
            };

            await expect(firstValueFrom(authService.editOwnProfile(profileDto))).rejects.toEqual(
                simulatedError,
            );

            testTokenServiceCalls({}, mockedTokenService);
        });
    });

    describe('createNewPassword', () => {
        it('should call createNewPassword method', async () => {
            const createNewPasswordData: NewPasswordRequestDto = {
                hash: 'User 1',
                password: 'Password123$',
                repeatPassword: 'Password123$',
            };

            mockedHttpService.post.mockReturnValue(of(mockAuthResponse));

            const authesponse = await firstValueFrom(
                authService.createNewPassword(createNewPasswordData),
            );

            expect(mockedHttpService.post).toHaveBeenCalledOnce();
            expect(mockedHttpService.post).toHaveBeenCalledWith({
                path: AuthRequestRoutes.NEW_PASSWORD.url,
                data: createNewPasswordData,
            });

            expect(authesponse).toEqual(mockAuthResponse);

            testTokenServiceCalls(
                {
                    setAccessToken: [mockAuthResponse.data.payload.token],
                    setRefreshToken: [mockAuthResponse.data.payload.refreshToken],
                },
                mockedTokenService,
            );
        });

        it('should fail calling createNewPassword method', async () => {
            const simulatedError = new HttpErrorResponse({
                error: 'Simulated error',
                status: HttpStatusCode.BadRequest,
            });

            mockedHttpService.post.mockReturnValue(throwError(() => simulatedError));

            const newPasswordDto: NewPasswordRequestDto = {
                hash: 'SOME_HASH',
                password: 'senha',
                repeatPassword: 'senha',
            };

            await expect(
                firstValueFrom(authService.createNewPassword(newPasswordDto)),
            ).rejects.toEqual(simulatedError);

            testTokenServiceCalls({}, mockedTokenService);
        });
    });

    describe('requestPasswordChangeLink', () => {
        it('should call requestPasswordChangeLink method', async () => {
            const requestPasswordChangeLinkRequestDto: RequestPasswordChangeLinkRequestDto = {
                email: 'user1@email.com',
            };

            mockedHttpService.post.mockReturnValue(of(true));

            const registerResponse = await firstValueFrom(
                authService.requestPasswordChangeLink(requestPasswordChangeLinkRequestDto),
            );

            expect(mockedHttpService.post).toHaveBeenCalledOnce();
            expect(mockedHttpService.post).toHaveBeenCalledWith({
                path: AuthRequestRoutes.REQUEST_PASSWORD_CREATION.url,
                data: requestPasswordChangeLinkRequestDto,
            });

            expect(registerResponse).toBe(true);

            testTokenServiceCalls({}, mockedTokenService);
        });

        it('should fail calling requestPasswordChangeLink method', async () => {
            const simulatedError = new HttpErrorResponse({
                error: 'Simulated error',
                status: HttpStatusCode.Unauthorized,
            });

            mockedHttpService.post.mockReturnValue(throwError(() => simulatedError));

            const requestPasswordChangeLinkDto: RequestPasswordChangeLinkRequestDto = {
                email: 'usuario@teste.com',
            };

            await expect(
                firstValueFrom(authService.requestPasswordChangeLink(requestPasswordChangeLinkDto)),
            ).rejects.toEqual(simulatedError);

            testTokenServiceCalls({}, mockedTokenService);
        });
    });

    describe('updateLoggedInUserPassword', () => {
        it('should call updateLoggedInUserPassword method', async () => {
            const updateLogedInUserPasswordData: UpdateLoggedInUserPasswordRequestDto = {
                password: 'Password123$',
                repeatPassword: 'Password123$',
            };

            mockedHttpService.post.mockReturnValue(of(mockAuthResponse));
            mockedTokenService.getAccessToken.mockReturnValue(mockAuthResponse.data.payload.token);

            const authesponse = await firstValueFrom(
                authService.updateLoggedInUserPassword(updateLogedInUserPasswordData),
            );

            expect(mockedHttpService.post).toHaveBeenCalledOnce();
            expect(mockedHttpService.post).toHaveBeenCalledWith({
                path: AuthRequestRoutes.UPDATE_LOGGED_IN_USER_PASSWORD.url,
                data: updateLogedInUserPasswordData,
            });

            expect(authesponse).toEqual(mockAuthResponse);

            testTokenServiceCalls(
                {
                    setAccessToken: [mockAuthResponse.data.payload.token],
                    setRefreshToken: [mockAuthResponse.data.payload.refreshToken],
                },
                mockedTokenService,
            );
        });

        it('should fail calling createNewPassword method', async () => {
            const simulatedError = new HttpErrorResponse({
                error: 'Simulated error',
                status: HttpStatusCode.Unauthorized,
            });

            mockedHttpService.post.mockReturnValue(throwError(() => simulatedError));

            const updateLoggedInUserPasswordDto: UpdateLoggedInUserPasswordRequestDto = {
                password: 'senha',
                repeatPassword: 'senha',
            };

            await expect(
                firstValueFrom(
                    authService.updateLoggedInUserPassword(updateLoggedInUserPasswordDto),
                ),
            ).rejects.toEqual(simulatedError);

            testTokenServiceCalls({}, mockedTokenService);
        });
    });

    describe('refreshToken', () => {
        it('should call refreshToken method and receive access token', async () => {
            const payload = {
                id: '891db31e-dfb5-42ed-b912-48b98463b004',
                name: 'John Williams',
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
            const mockAuthResponse: AuthResponseDto = {
                status: 'success',
                data: {
                    user: {
                        id: '891db31e-dfb5-42ed-b912-48b98463b004',
                        name: 'John Williams',
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

            mockedHttpService.post.mockReturnValue(of(mockAuthResponse));
            mockedTokenService.getAccessToken.mockReturnValue(null);
            mockedTokenService.getRefreshToken.mockReturnValue(refreshToken);

            const authesponse = await firstValueFrom(authService.refreshToken());

            expect(mockedHttpService.post).toHaveBeenCalledOnce();
            expect(mockedHttpService.post).toHaveBeenCalledWith({
                path: AuthRequestRoutes.REFRESH.url,
                data: {
                    refreshToken: mockAuthResponse.data.payload.refreshToken,
                },
            });

            expect(authesponse).toEqual(accessToken);

            expect(mockedTokenService.getAccessToken).not.toHaveBeenCalled();
            expect(mockedTokenService.getRefreshToken).toHaveBeenCalledOnce();
            expect(mockedTokenService.setAccessToken).toHaveBeenCalledOnce();
            expect(mockedTokenService.setAccessToken).toHaveBeenCalledWith(
                mockAuthResponse.data.payload.token,
            );
            expect(mockedTokenService.setRefreshToken).not.toHaveBeenCalled();
            expect(mockedTokenService.clearTokens).not.toHaveBeenCalled();

            testTokenServiceCalls(
                {
                    getRefreshToken: 1,
                    setAccessToken: [mockAuthResponse.data.payload.token],
                },
                mockedTokenService,
            );
        });

        it('should call refreshToken method and receive null istead of access token when both token and refresh token are not defined', async () => {
            mockedTokenService.getAccessToken.mockReturnValue(null);
            mockedTokenService.getRefreshToken.mockReturnValue(null);

            const authesponse = await firstValueFrom(authService.refreshToken());

            expect(authesponse).toBeNull();
            expect(mockedHttpService.post).not.toHaveBeenCalled();
            expect(mockedTokenService.getAccessToken).not.toHaveBeenCalled();
            expect(mockedTokenService.getRefreshToken).toHaveBeenCalledOnce();
            expect(mockedTokenService.setAccessToken).not.toHaveBeenCalled();
            expect(mockedTokenService.setRefreshToken).not.toHaveBeenCalled();
            expect(mockedTokenService.clearTokens).toHaveBeenCalledOnce();
        });

        it('should return false when calling refreshToken method and receiving a 401 Unauthorized error from http request', async () => {
            const mockRefreshToken = 'mocked-refresh-token';

            mockedHttpService.post.mockReturnValue(
                throwError(
                    () =>
                        new HttpErrorResponse({
                            error: 'Simulated error',
                            status: HttpStatusCode.Unauthorized,
                        }),
                ),
            );

            mockedTokenService.getAccessToken.mockReturnValue(null);
            mockedTokenService.getRefreshToken.mockReturnValue(mockRefreshToken);

            const response = await firstValueFrom(authService.refreshToken());

            expect(response).toBeNull();
            expect(mockedTokenService.getAccessToken).not.toHaveBeenCalled();
            expect(mockedTokenService.getRefreshToken).toHaveBeenCalledOnce();
            expect(mockedTokenService.setAccessToken).not.toHaveBeenCalled();
            expect(mockedTokenService.setRefreshToken).not.toHaveBeenCalled();
            expect(mockedTokenService.clearTokens).toHaveBeenCalledOnce();
        });

        it('should fail calling refreshToken method when receives a non 401 Unauthorized error from http request', async () => {
            const payload = {
                id: '891db31e-dfb5-42ed-b912-48b98463b004',
                name: 'John Williams',
                email: 'john@example.com',
                roles: [Role.user],
                active: true,
                created: '2024-02-03T19:05:21.689Z',
                updated: '2024-02-03T19:05:21.689Z',
                deletedAt: null,
                exp: Math.floor(Date.now() / 1000) + 60 * 6,
            };
            const refreshToken = await generateToken(payload);

            const simulatedError = new HttpErrorResponse({
                error: 'Simulated error',
                status: HttpStatusCode.Forbidden,
            });

            mockedHttpService.post.mockReturnValue(throwError(() => simulatedError));
            mockedTokenService.getAccessToken.mockReturnValue(null);
            mockedTokenService.getRefreshToken.mockReturnValue(refreshToken);

            try {
                await firstValueFrom(authService.refreshToken());
                // Força falha se a promise resolver de forma inesperada
                expect.unreachable('Expected refreshToken to throw an error');
            } catch (err: any) {
                expect(err).toBeDefined();
                expect(err.error).toEqual('Simulated error');
                expect(err.cause).not.toBeDefined();

                expect(mockedHttpService.post).toHaveBeenCalledOnce();
                expect(mockedHttpService.post).toHaveBeenCalledWith({
                    path: AuthRequestRoutes.REFRESH.url,
                    data: { refreshToken },
                });

                expect(mockedTokenService.getAccessToken).not.toHaveBeenCalled();
                expect(mockedTokenService.getRefreshToken).toHaveBeenCalledOnce();
                expect(mockedTokenService.setAccessToken).not.toHaveBeenCalled();
                expect(mockedTokenService.setRefreshToken).not.toHaveBeenCalled();
                expect(mockedTokenService.clearTokens).not.toHaveBeenCalled();
            }
        });
    });

    describe('isAuthenticated', () => {
        it.skip('should return false when access token is not defined and refresh token is not defined', async () => {});

        it.skip('should return false when access token is not defined and refresh token is expired', async () => {});

        it.skip('should return true when access token is not defined and refresh token is valid', async () => {});

        it.skip('should return false when access token is expired and refresh token is not defined', async () => {});

        it.skip('should return false when access token is expired and refresh token is expired', async () => {});

        it.skip('should return true when access token is expired and refresh token is valid', async () => {});

        it.skip('should return true when access token is valid and refresh token is not defined', async () => {});

        it.skip('should return true when access token is valid and refresh token is expired', async () => {});

        it.skip('should return true when access token is valid and refresh token is valid', async () => {});

        it.skip('should handle unauthorized error', async () => {});

        it.skip('should return true when the error is other than unauthorized', async () => {});

        // TODO: remove
        it.skip('should fail calling isAuthenticated method', async () => {});
    });
});
