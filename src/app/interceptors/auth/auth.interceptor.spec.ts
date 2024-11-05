import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { AuthInterceptor } from './auth.interceptor';
import { TokenService } from '../../services/token/token.service';

describe('AuthInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        TokenService,
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve adicionar o token de autenticação ao cabeçalho da requisição', () => {
    spyOn(tokenService, 'getToken').and.returnValue('mocked-token');

    httpClient.get('/data').subscribe();

    const httpRequest = httpMock.expectOne('/data');
    expect(httpRequest.request.headers.has('Authorization')).toBeTrue();
    expect(httpRequest.request.headers.get('Authorization')).toBe(
      'Token mocked-token'
    );
  });

  it('não deve adicionar o cabeçalho Authorization se o token não existir', () => {
    spyOn(tokenService, 'getToken').and.returnValue(null);

    httpClient.get('/data').subscribe();

    const httpRequest = httpMock.expectOne('/data');
    expect(httpRequest.request.headers.has('Authorization')).toBeFalse();
  });
});
