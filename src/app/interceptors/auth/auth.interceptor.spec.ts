import {
    HTTP_INTERCEPTORS,
    HttpClient,
    HttpErrorResponse,
    HttpStatusCode,
    provideHttpClient,
    withInterceptorsFromDi,
} from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthInterceptor } from '@interceptors/auth/auth.interceptor';
import { AuthService } from '@services/auth/auth.service';
import { AuthResponseDto } from '@services/auth/dtos/auth.response.dto';
import {
    testCreateMockedTokenService,
    testTokenServiceCalls,
} from '@services/token/test-token-service.utils';
import { TokenService } from '@services/token/token.service';
import { Role } from '@services/user/dtos/role/role.enum';
import { of, throwError } from 'rxjs';
import { MockedObject } from 'vitest';

const URL = 'test/url';
const GET = 'get';
const MOCKED_ACCESS_TOKEN = 'mocked-access-token';
const MOCKED_REFRESH_TOKEN = 'mocked-refresh-token';
const BEARER_MOCKED_ACCESS_TOKEN = 'Bearer mocked-access-token';
const EXPIRED_TEST_ACCESS_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDY5ODcxMjEsImV4cCI6MTcwNzA3MzUyMSwic3ViIjoiODkxZGIzMWUtZGZiNS00MmVkLWI5MTItNDhiOTg0NjNiMDA0In0.LaW-Z0DkU5ZheRtst0mvZ3WtMgMmMeawJVke9qtCVyE';
const EXPIRED_TEST_REFRESH_TOKEN =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDY5ODcxMjEsImV4cCI6NDI5ODk4NzEyMSwic3ViIjoiODkxZGIzMWUtZGZiNS00MmVkLWI5MTItNDhiOTg0NjNiMDA0IiwianRpIjoiMTI4In0.bJTClITMvD5NCDt5DjTmxn3DIjFOabEvsCvnK795VXU';
const AUTHORIZATION = 'Authorization';

describe('AuthInterceptor', () => {
    let httpMock: HttpTestingController;
    let httpClient: HttpClient;
    let authService: MockedObject<AuthService>;
    let routerSpy: MockedObject<Router>;

    let mockedTokenService: any;

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

    beforeEach(() => {
        mockedTokenService = testCreateMockedTokenService();
        const authServiceMock = {
            refreshToken: vi.fn(),
        } as unknown as MockedObject<AuthService>;

        const routerMock = {
            navigate: vi.fn(),
        } as unknown as MockedObject<Router>;

        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting(),
                { provide: TokenService, useValue: mockedTokenService },
                { provide: AuthService, useValue: authServiceMock },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthInterceptor,
                    multi: true,
                },
                { provide: Router, useValue: routerMock },
            ],
        });
        httpMock = TestBed.inject(HttpTestingController);
        httpClient = TestBed.inject(HttpClient);
        authService = TestBed.inject(AuthService) as MockedObject<AuthService>;
        routerSpy = TestBed.inject(Router) as MockedObject<Router>;
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should make successful request, and not refresh token, when access token is already available', () => {
        mockedTokenService.getAccessToken.mockReturnValue(MOCKED_ACCESS_TOKEN);
        mockedTokenService.getRefreshToken.mockReturnValue(MOCKED_REFRESH_TOKEN);
        mockedTokenService.setAccessToken.mockReturnValue(null);
        mockedTokenService.setRefreshToken.mockReturnValue(null);
        mockedTokenService.clearTokens.mockReturnValue(null);

        authService.refreshToken.mockReturnValue(of(mockAuthResponse.data.payload.token));

        httpClient.post(URL, null, { headers: { [AUTHORIZATION]: 'true' } }).subscribe();

        const httpRequest = httpMock.expectOne(URL);
        expect(httpRequest.request.headers.has(AUTHORIZATION)).toBe(true);
        expect(httpRequest.request.headers.get(AUTHORIZATION)).toBe(BEARER_MOCKED_ACCESS_TOKEN);

        expect(mockedTokenService.getRefreshToken).not.toHaveBeenCalled();

        testTokenServiceCalls({ getAccessToken: 1 }, mockedTokenService);

        expect(routerSpy.navigate).not.toHaveBeenCalled();
    });

    it('should refresh token and make successful request when access token is not found', () => {
        mockedTokenService.getAccessToken.mockReturnValue(null);
        mockedTokenService.getRefreshToken.mockReturnValue(null);
        mockedTokenService.setAccessToken.mockReturnValue(null);
        mockedTokenService.setRefreshToken.mockReturnValue(null);
        mockedTokenService.clearTokens.mockReturnValue(null);

        authService.refreshToken.mockReturnValue(of(mockAuthResponse.data.payload.token));

        httpClient.post(URL, null, { headers: { [AUTHORIZATION]: 'true' } }).subscribe();

        const httpRequest = httpMock.expectOne(URL);

        testTokenServiceCalls({ getAccessToken: 1 }, mockedTokenService);

        expect(authService.refreshToken).toHaveBeenCalled();

        expect(routerSpy.navigate).not.toHaveBeenCalled();
    });

    it('should refresh token and make a new successful request when the first request failed with unauthorized status', () => {
        const newAccessToken = 'A_NEW_ACCESS_TOKEN';
        mockedTokenService.getAccessToken.mockReturnValue(EXPIRED_TEST_ACCESS_TOKEN);
        mockedTokenService.getRefreshToken.mockReturnValue(null);
        mockedTokenService.setAccessToken.mockReturnValue(null);
        mockedTokenService.setRefreshToken.mockReturnValue(null);
        mockedTokenService.clearTokens.mockReturnValue(null);

        authService.refreshToken.mockReturnValue(of(newAccessToken));

        const client = httpClient as unknown as any;

        client
            .post(URL, null, { headers: { [AUTHORIZATION]: 'true' } })
            .subscribe((response: any) => {
                expect(response).toBeTruthy();
            });

        // primeira requisição falha

        let requests = httpMock.match(URL);
        expect(requests.length).toEqual(1);
        expect(requests[0].request.headers.has(AUTHORIZATION)).toBe(true);
        expect(requests[0].request.headers.get(AUTHORIZATION)).toBe(
            `Bearer ${EXPIRED_TEST_ACCESS_TOKEN}`,
        );
        requests[0].flush(null, {
            status: HttpStatusCode.Unauthorized,
            statusText: 'Unauthorized',
        });
        testTokenServiceCalls({ getAccessToken: 1 }, mockedTokenService);
        expect(routerSpy.navigate).not.toHaveBeenCalled();

        // segunda requisição bem sucedida

        requests = httpMock.match(URL);
        expect(requests.length).toEqual(1);
        expect(requests[0].request.headers.get(AUTHORIZATION)).toBe(`Bearer ${newAccessToken}`);
        requests[0].flush({ success: true });
        testTokenServiceCalls({ getAccessToken: 1 }, mockedTokenService);

        expect(routerSpy.navigate).not.toHaveBeenCalled();
    });

    it('should fail to refresh token and redirect to login screen when TokenService.refreshToken returns null', () => {
        authService.refreshToken.mockReturnValue(of(null));

        mockedTokenService.getAccessToken.mockReturnValue(null);
        mockedTokenService.getRefreshToken.mockReturnValue(null);
        mockedTokenService.setAccessToken.mockReturnValue(null);
        mockedTokenService.setRefreshToken.mockReturnValue(null);
        mockedTokenService.clearTokens.mockReturnValue(null);

        httpClient.post(URL, null, { headers: { [AUTHORIZATION]: 'true' } }).subscribe();

        const httpRequest = httpMock.expectOne(URL);

        expect(authService.refreshToken).toHaveBeenCalledTimes(1);

        testTokenServiceCalls({ getAccessToken: 1 }, mockedTokenService);

        expect(authService.refreshToken).toHaveBeenCalledTimes(1);

        expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should rethrow error coming from request', () => {
        mockedTokenService.getAccessToken.mockReturnValue(null);
        mockedTokenService.getRefreshToken.mockReturnValue(null);
        mockedTokenService.setAccessToken.mockReturnValue(null);
        mockedTokenService.setRefreshToken.mockReturnValue(null);
        mockedTokenService.clearTokens.mockReturnValue(null);

        const simulatedError = new HttpErrorResponse({
            error: 'Simulated error',
            status: HttpStatusCode.BadRequest,
        });
        authService.refreshToken.mockReturnValue(throwError(() => simulatedError));

        httpClient.post(URL, null, { headers: { [AUTHORIZATION]: 'true' } }).subscribe({
            next: () => {
                expect(true).toBeFalsy();
            },
            error: (error: HttpErrorResponse) => {
                expect(error.error).toEqual('Simulated error');
                expect(error.status).toEqual(HttpStatusCode.BadRequest);

                testTokenServiceCalls({ getAccessToken: 1 }, mockedTokenService);
            },
            complete: () => {
                expect(true).toBeFalsy();
            },
        });
    });

    it('should do a susscessfull request when access token is not necessary', () => {
        mockedTokenService.getAccessToken.mockReturnValue(null);
        mockedTokenService.getRefreshToken.mockReturnValue(null);
        mockedTokenService.setAccessToken.mockReturnValue(null);
        mockedTokenService.setRefreshToken.mockReturnValue(null);
        mockedTokenService.clearTokens.mockReturnValue(null);

        authService.refreshToken.mockReturnValue(of(mockAuthResponse.data.payload.token));

        httpClient.post(URL, null).subscribe();

        const httpRequest = httpMock.expectOne(URL);

        expect(httpRequest.request.headers.has('Authorization')).toBe(false);
        expect(httpRequest.request.headers.get('Authorization')).toEqual(null);
    });
});
