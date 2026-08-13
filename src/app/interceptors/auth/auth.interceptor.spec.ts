import {
    HTTP_INTERCEPTORS,
    HttpClient,
    HttpErrorResponse,
    HttpStatusCode,
} from '@angular/common/http';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
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
    let authService: jasmine.SpyObj<AuthService>;
    let routerSpy: jasmine.SpyObj<Router>;

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
        authService = jasmine.createSpyObj('AuthService', ['refreshToken']);
        const router = jasmine.createSpyObj('Router', ['navigate']);
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                { provide: TokenService, useValue: mockedTokenService },
                { provide: AuthService, useValue: authService },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthInterceptor,
                    multi: true,
                },
                { provide: Router, useValue: router },
            ],
        });
        httpMock = TestBed.inject(HttpTestingController);
        httpClient = TestBed.inject(HttpClient);
        routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should make successful request, and not refresh token, when access token is already available', () => {
        mockedTokenService.getAccessToken.and.returnValue(MOCKED_ACCESS_TOKEN);
        mockedTokenService.getRefreshToken.and.returnValue(
            MOCKED_REFRESH_TOKEN,
        );
        mockedTokenService.setAccessToken.and.returnValue(null);
        mockedTokenService.setRefreshToken.and.returnValue(null);
        mockedTokenService.clearTokens.and.returnValue(null);

        authService.refreshToken.and.returnValue(
            of(mockAuthResponse.data.payload.token),
        );

        httpClient
            .post(URL, null, { headers: { [AUTHORIZATION]: 'true' } })
            .subscribe();

        const httpRequest = httpMock.expectOne(URL);
        expect(httpRequest.request.headers.has(AUTHORIZATION)).toBeTrue();
        expect(httpRequest.request.headers.get(AUTHORIZATION)).toBe(
            BEARER_MOCKED_ACCESS_TOKEN,
        );

        expect(mockedTokenService.getRefreshToken)
            .withContext('tokenService.getRefreshToken call')
            .not.toHaveBeenCalledWith();

        testTokenServiceCalls({ getAccessToken: 1 }, mockedTokenService);

        expect(routerSpy.navigate).not.toHaveBeenCalled();
    });

    it('should refresh token and make successful request when access token is not found', () => {
        mockedTokenService.getAccessToken.and.returnValue(null);
        mockedTokenService.getRefreshToken.and.returnValue(null);
        mockedTokenService.setAccessToken.and.returnValue(null);
        mockedTokenService.setRefreshToken.and.returnValue(null);
        mockedTokenService.clearTokens.and.returnValue(null);

        authService.refreshToken.and.returnValue(
            of(mockAuthResponse.data.payload.token),
        );

        httpClient
            .post(URL, null, { headers: { [AUTHORIZATION]: 'true' } })
            .subscribe();

        const httpRequest = httpMock.expectOne(URL);

        testTokenServiceCalls({ getAccessToken: 1 }, mockedTokenService);

        expect(authService.refreshToken)
            .withContext('tokenService.refreshToken call')
            .toHaveBeenCalled();

        expect(routerSpy.navigate).not.toHaveBeenCalled();
    });

    it('should refresh token and make a new successful request when the first request failed with unauthorized status', () => {
        const newAccessToken = 'A_NEW_ACCESS_TOKEN';
        mockedTokenService.getAccessToken.and.returnValue(
            EXPIRED_TEST_ACCESS_TOKEN,
        );
        mockedTokenService.getRefreshToken.and.returnValue(null);
        mockedTokenService.setAccessToken.and.returnValue(null);
        mockedTokenService.setRefreshToken.and.returnValue(null);
        mockedTokenService.clearTokens.and.returnValue(null);

        authService.refreshToken.and.returnValue(of(newAccessToken));

        const client = httpClient as unknown as any;

        client
            .post(URL, null, { headers: { [AUTHORIZATION]: 'true' } })
            .subscribe((response: any) => {
                expect(response).toBeTruthy();
            });

        // primeira requisição falha

        let requests = httpMock.match(URL);
        expect(requests.length).toEqual(1);
        expect(requests[0].request.headers.has(AUTHORIZATION)).toBeTrue();
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
        expect(requests[0].request.headers.get(AUTHORIZATION)).toBe(
            `Bearer ${newAccessToken}`,
        );
        requests[0].flush({ success: true });
        testTokenServiceCalls({ getAccessToken: 1 }, mockedTokenService);

        expect(routerSpy.navigate).not.toHaveBeenCalled();
    });

    it('should fail to refresh token and redirect to login screen when TokenService.refreshToken returns null', () => {
        const spy = authService.refreshToken.and.returnValue(of(null));

        mockedTokenService.getAccessToken.and.returnValue(null);
        mockedTokenService.getRefreshToken.and.returnValue(null);
        mockedTokenService.setAccessToken.and.returnValue(null);
        mockedTokenService.setRefreshToken.and.returnValue(null);
        mockedTokenService.clearTokens.and.returnValue(null);

        httpClient
            .post(URL, null, { headers: { [AUTHORIZATION]: 'true' } })
            .subscribe();

        const httpRequest = httpMock.expectOne(URL);

        expect(spy).toHaveBeenCalledOnceWith();

        testTokenServiceCalls({ getAccessToken: 1 }, mockedTokenService);

        expect(authService.refreshToken)
            .withContext('authService.refreshToken call')
            .toHaveBeenCalledOnceWith();

        expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should rethrow error coming from request', () => {
        mockedTokenService.getAccessToken.and.returnValue(null);
        mockedTokenService.getRefreshToken.and.returnValue(null);
        mockedTokenService.setAccessToken.and.returnValue(null);
        mockedTokenService.setRefreshToken.and.returnValue(null);
        mockedTokenService.clearTokens.and.returnValue(null);

        const simulatedError = new HttpErrorResponse({
            error: 'Simulated error',
            status: HttpStatusCode.BadRequest,
        });
        authService.refreshToken.and.returnValue(
            throwError(() => simulatedError),
        );

        httpClient
            .post(URL, null, { headers: { [AUTHORIZATION]: 'true' } })
            .subscribe({
                next: () => {
                    expect(true)
                        .withContext('not reachable code (next)')
                        .toBeFalsy();
                },
                error: (error: HttpErrorResponse) => {
                    expect(error.error).toEqual('Simulated error');
                    expect(error.status).toEqual(HttpStatusCode.BadRequest);

                    testTokenServiceCalls(
                        { getAccessToken: 1 },
                        mockedTokenService,
                    );
                },
                complete: () => {
                    expect(true)
                        .withContext('not reachable code (complete)')
                        .toBeFalsy();
                },
            });
    });

    it('should do a susscessfull request when access token is not necessary', () => {
        mockedTokenService.getAccessToken.and.returnValue(null);
        mockedTokenService.getRefreshToken.and.returnValue(null);
        mockedTokenService.setAccessToken.and.returnValue(null);
        mockedTokenService.setRefreshToken.and.returnValue(null);
        mockedTokenService.clearTokens.and.returnValue(null);

        authService.refreshToken.and.returnValue(
            of(mockAuthResponse.data.payload.token),
        );

        httpClient.post(URL, null).subscribe();

        const httpRequest = httpMock.expectOne(URL);

        expect(httpRequest.request.headers.has('Authorization')).toBeFalse();
        expect(httpRequest.request.headers.get('Authorization'))
            .withContext(`Post ${URL} access token`)
            .toEqual(null);
    });
});
