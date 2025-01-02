import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import {
  HTTP_INTERCEPTORS,
  HttpStatusCode,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AuthInterceptor } from '../../interceptors/auth/auth.interceptor';
import { TokenService } from '../token/token.service';

describe('HttpService', () => {
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
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
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

  it('should throw error when path is missing', () => {
    expect(() => {
      httpService.post('', {});
    }).toThrowError('Missing request path');
  });

  it('should make a POST request without access token and return data', () => {
    spyOn(tokenService, 'getAccessToken').and.returnValue(null);

    const testData = { id: 1, name: 'Test' };
    const testPath = 'test';
    httpService.post(testPath, testData).subscribe((response) => {
      expect(response).toEqual(testData);
    });

    const httpRequest = httpMock.expectOne(
      `http://localhost:3000/api/${testPath}`
    );
    expect(httpRequest.request.method).toEqual('POST');
    expect(httpRequest.request.headers.has('Authorization')).toBeFalse();
    expect(httpRequest.request.headers.get('Authorization')).toBe(null);
    httpRequest.flush(testData, {
      status: HttpStatusCode.Ok,
      statusText: 'OK',
    });
  });

  it('should make a POST request using a access token', () => {
    spyOn(tokenService, 'getAccessToken').and.returnValue(
      'mocked-access-token'
    );

    const testData = { id: 1, name: 'Test' };
    const testPath = 'test';
    httpService.post(testPath, testData).subscribe((response) => {
      expect(response).toEqual(testData);
    });

    const httpRequest = httpMock.expectOne(
      `http://localhost:3000/api/${testPath}`
    );

    expect(httpRequest.request.headers.has('Authorization')).toBeTrue();
    expect(httpRequest.request.headers.get('Authorization')).toBe(
      'Token mocked-access-token'
    );

    httpRequest.flush(testData, {
      status: HttpStatusCode.Ok,
      statusText: 'OK',
    });
  });

  it('should handle error', () => {
    const testPath = 'test';
    httpService.post(testPath, {}).subscribe({
      error: (err) => {
        expect(err.status).toEqual(HttpStatusCode.BadRequest);
        expect(err.message).toEqual(
          `Http failure response for http://localhost:3000/api/${testPath}: ${HttpStatusCode.BadRequest} Falha na requisição`
        );
      },
    });

    const httpRequest = httpMock.expectOne(
      `http://localhost:3000/api/${testPath}`
    );
    expect(httpRequest.request.method).toEqual('POST');
    httpRequest.flush('Internal Server Error', {
      status: HttpStatusCode.BadRequest,
      statusText: 'Falha na requisição',
    });
  });
});
