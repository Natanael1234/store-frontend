import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('HttpService', () => {
  let httpService: HttpService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService],
    });

    httpService = TestBed.inject(HttpService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(httpService).toBeTruthy();
  });

  afterEach(() => {
    controller.verify();
  });

  it('should throw error when path is missing', () => {
    expect(() => {
      httpService.post('', {});
    }).toThrowError('Missing request path');
  });

  it('should make a POST request and return data', () => {
    const testData = { id: 1, name: 'Test' };
    const testPath = 'test';
    httpService.post(testPath, testData).subscribe((response) => {
      expect(response).toEqual(testData);
    });

    const req = controller.expectOne(`http://localhost:3000/api/${testPath}`);
    expect(req.request.method).toEqual('POST');

    req.flush(testData, { status: 200, statusText: 'OK' });
  });

  it('should handle error', () => {
    const testPath = 'test';
    httpService.post(testPath, {}).subscribe({
      error: (err) => {
        expect(err.status).toEqual(400);
        expect(err.message).toEqual(
          `Http failure response for http://localhost:3000/api/${testPath}: 400 Falha na requisição`
        );
      },
    });

    const req = controller.expectOne(`http://localhost:3000/api/${testPath}`);
    expect(req.request.method).toEqual('POST');
    req.flush('Internal Server Error', {
      status: 400,
      statusText: 'Falha na requisição',
    });
  });
});
