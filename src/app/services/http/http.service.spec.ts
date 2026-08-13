import { TestBed } from '@angular/core/testing';

import {
    HTTP_INTERCEPTORS,
    HttpStatusCode,
    provideHttpClient,
    withInterceptorsFromDi,
} from '@angular/common/http';
import {
    HttpTestingController,
    provideHttpClientTesting,
} from '@angular/common/http/testing';
import { AuthInterceptor } from '@interceptors/auth/auth.interceptor';
import { HttpService } from '@services/http/http.service';
import { TokenService } from '@services/token/token.service';

const testPath = 'some_path/test';
const testUrl = `http://localhost:3000/api/${testPath}`;
const AUTHORIZATION = 'Authorization';
const POST = 'POST';
const GET = 'GET';
const OK = 'OK';
const MOCKED_ACCESS_TOKEN = 'mocked-access-token';
const BEARER_MOCKED_ACCESS_TOKEN = 'Bearer mocked-access-token';
const FALHA_NA_REQUISICAO = 'Falha na requisição';

describe('HttpService.', () => {
    let httpService: HttpService;
    let httpMock: HttpTestingController;
    let tokenService: TokenService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [
                HttpService,

                provideHttpClient(withInterceptorsFromDi()),
                provideHttpClientTesting(),
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthInterceptor,
                    multi: true,
                },
            ],
        });

        httpService = TestBed.inject(HttpService);
        httpMock = TestBed.inject(HttpTestingController);
        tokenService = TestBed.inject(TokenService);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(httpService).toBeTruthy();
    });

    describe('POST', () => {
        it('should throw error when path is missing', () => {
            expect(() => {
                httpService.post({
                    path: '',
                    data: {},
                });
            }).toThrowError('Missing request path');
        });

        it('should make a POST request without authorization and return data', () => {
            spyOn(tokenService, 'getAccessToken').and.returnValue(null);

            const data = { test: 'testing' };
            httpService
                .post({
                    path: testPath,
                    data,
                    authorization: false,
                })
                .subscribe((response) => {
                    expect(response).toEqual(data);
                });

            const httpRequest = httpMock.expectOne(testUrl);
            expect(httpRequest.request.method).toEqual(POST);

            expect(httpRequest.request.headers.has(AUTHORIZATION)).toBeFalse();
            expect(httpRequest.request.headers.get(AUTHORIZATION)).toBe(null);
            httpRequest.flush(data, {
                status: HttpStatusCode.Ok,
                statusText: OK,
            });
        });

        it('should make a POST request using authorization', () => {
            spyOn(tokenService, 'getAccessToken').and.returnValue(
                MOCKED_ACCESS_TOKEN,
            );

            const data = { test: 'testing' };
            httpService
                .post({
                    path: testPath,
                    data,
                    authorization: true,
                })
                .subscribe((response) => {
                    expect(response).toEqual(data);
                });

            const httpRequest = httpMock.expectOne(testUrl);

            expect(httpRequest.request.headers.has(AUTHORIZATION)).toBeTrue();
            expect(httpRequest.request.headers.get(AUTHORIZATION)).toBe(
                BEARER_MOCKED_ACCESS_TOKEN,
            );

            httpRequest.flush(data, {
                status: HttpStatusCode.Ok,
                statusText: OK,
            });
        });

        it('should handle error', () => {
            httpService
                .post({
                    path: testPath,
                    data: {},
                })
                .subscribe({
                    error: (err) => {
                        expect(err.status).toEqual(HttpStatusCode.BadRequest);
                        expect(err.message).toEqual(
                            `Http failure response for ${testUrl}: ${HttpStatusCode.BadRequest} Falha na requisição`,
                        );
                    },
                });

            const httpRequest = httpMock.expectOne(testUrl);
            expect(httpRequest.request.method).toEqual(POST);

            httpRequest.flush('Internal Server Error', {
                status: HttpStatusCode.BadRequest,
                statusText: FALHA_NA_REQUISICAO,
            });
        });
    });

    describe('GET', () => {
        it('should throw error when path is missing', () => {
            expect(() => {
                httpService.get({ path: '' });
            }).toThrowError('Missing request path');
        });

        it('should make a GET request without authorization and return data', () => {
            spyOn(tokenService, 'getAccessToken').and.returnValue(null);

            const testData = { test: 'testing' };
            httpService.get({ path: testPath }).subscribe((response) => {
                expect(response).toEqual(testData);
            });

            const httpRequest = httpMock.expectOne(testUrl);
            expect(httpRequest.request.method).toEqual(GET);
            expect(httpRequest.request.headers.has(AUTHORIZATION)).toBeFalse();
            expect(httpRequest.request.headers.get(AUTHORIZATION)).toBe(null);
            httpRequest.flush(testData, {
                status: HttpStatusCode.Ok,
                statusText: OK,
            });
        });

        it('should make a GET request using authorization', () => {
            spyOn(tokenService, 'getAccessToken').and.returnValue(
                MOCKED_ACCESS_TOKEN,
            );

            const data = { test: 'testing' };
            httpService
                .get({
                    path: testPath,
                    queryParams: data,
                    authorization: true,
                })
                .subscribe((response) => {
                    expect(response).toEqual(data);
                });

            const httpRequest = httpMock.expectOne(testUrl + '?test=testing');

            expect(httpRequest.request.headers.has(AUTHORIZATION)).toBeTrue();
            expect(httpRequest.request.headers.get(AUTHORIZATION)).toBe(
                BEARER_MOCKED_ACCESS_TOKEN,
            );

            httpRequest.flush(data, {
                status: HttpStatusCode.Ok,
                statusText: OK,
            });
        });

        it('should handle error', () => {
            httpService.get({ path: testPath }).subscribe({
                error: (err) => {
                    expect(err.status).toEqual(HttpStatusCode.BadRequest);
                    expect(err.message).toEqual(
                        `Http failure response for ${testUrl}: ${HttpStatusCode.BadRequest} Falha na requisição`,
                    );
                },
            });

            const httpRequest = httpMock.expectOne(testUrl);
            expect(httpRequest.request.method).toEqual(GET);

            httpRequest.flush('Internal Server Error', {
                status: HttpStatusCode.BadRequest,
                statusText: FALHA_NA_REQUISICAO,
            });
        });
    });
});
